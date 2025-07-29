// frontend/src/Components/CaseCard.jsx

import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { SlCalender } from "react-icons/sl";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BsCalendar3Week } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import { memo } from "react";
import "./CaseCard.css"; 
import { Link } from "react-router-dom";

const angle = 5;

const lerp = (start, end, amount) => (1 - amount) * start + amount * end;

const remap = (value, oldMax, newMax) => {
  const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
  return Math.min(Math.max(newValue, -newMax), newMax);
};

const CaseCard = memo(({ caseData }) => {
  const { title, courtName, isClosed, createdAt } = caseData;

  const cardRef = useRef(null);
  const targetRotateX = useRef(0);
  const targetRotateY = useRef(0);
  const currentRotateX = useRef(0);
  const currentRotateY = useRef(0);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (event) => {
      const rect = card.getBoundingClientRect();
      const centerX = (rect.left + rect.right) / 2;
      const centerY = (rect.top + rect.bottom) / 2;
      const posX = event.pageX - centerX;
      const posY = event.pageY - centerY;
      targetRotateX.current = remap(posY, rect.height / 2, angle);
      targetRotateY.current = remap(posX, rect.width / 2, angle);
    };

    const handleMouseLeave = () => {
      targetRotateX.current = 0;
      targetRotateY.current = 0;
    };

    const update = () => {
      currentRotateX.current = lerp(
        currentRotateX.current,
        targetRotateX.current,
        0.1
      );
      currentRotateY.current = lerp(
        currentRotateY.current,
        targetRotateY.current,
        0.1
      );
      card.style.setProperty("--rotateX", `${-currentRotateX.current}deg`);
      card.style.setProperty("--rotateY", `${currentRotateY.current}deg`);
      requestAnimationFrame(update);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    requestAnimationFrame(update);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const getStatusColor = (status) => {
    return status
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-blue-50 text-blue-700 border-blue-200";
  };

  const getStatusIcon = (status) => {
    return status ? (
      <IoIosCheckmarkCircleOutline className="w-4 h-4" />
    ) : (
      <FiAlertCircle className="w-4 h-4" />
    );
  };

  return (<Link to={`/cases/${caseData._id}`} className="block group">
    <div className="card border-left-behind" ref={cardRef}>
      <div className="content">
        <div className="group bg-white shadow-sm hover:shadow-xl rounded-xl p-6 border border-gray-100 hover:border-gray-200 cursor- relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {title}
              </h2>
            </div>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(isClosed)}`}
            >
              {getStatusIcon(isClosed)}
              {isClosed ? "Closed" : "Active"}
            </div>
          </div>

          {/* Court Information */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <BsCalendar3Week className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-600 mb-1">Court</p>
              <p className="text-gray-900 font-semibold truncate">
                {courtName || "Court Not Specified"}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <SlCalender className="w-4 h-4" />
              <span>Created</span>
            </div>
            <time className="text-sm font-medium text-gray-700">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>

          {/* Hover Effect Indicator */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>
    </div>
  </Link>)
});

CaseCard.displayName = "CaseCard";

CaseCard.propTypes = {
  caseData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    courtName: PropTypes.string,
    isClosed: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default CaseCard;
