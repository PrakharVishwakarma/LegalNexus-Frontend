// frontend/src/Components/CaseCard.jsx

import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { SlCalender } from "react-icons/sl";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BsCalendar3Week } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import { memo } from "react";
import { Link } from "react-router-dom";

// import "./CaseCard.css"; // ❌ removed external CSS

const angle = 5;

const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

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

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = (rect.left + rect.right) / 2;
      const centerY = (rect.top + rect.bottom) / 2;
      const posX = e.pageX - centerX;
      const posY = e.pageY - centerY;
      targetRotateX.current = remap(posY, rect.height / 2, angle);
      targetRotateY.current = remap(posX, rect.width / 2, angle);
    };

    const handleMouseLeave = () => {
      targetRotateX.current = 0;
      targetRotateY.current = 0;
    };

    const update = () => {
      currentRotateX.current = lerp(currentRotateX.current, targetRotateX.current, 0.1);
      currentRotateY.current = lerp(currentRotateY.current, targetRotateY.current, 0.1);
      card.style.setProperty("--tw-rotate-x", `${-currentRotateX.current}deg`);
      card.style.setProperty("--tw-rotate-y", `${currentRotateY.current}deg`);
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

  const getStatusColor = (status) =>
    status
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-blue-50 text-blue-700 border-blue-200";

  const getStatusIcon = (status) =>
    status ? (
      <IoIosCheckmarkCircleOutline className="w-4 h-4" />
    ) : (
      <FiAlertCircle className="w-4 h-4" />
    );

  return (
    <Link to={`/cases/${caseData._id}`} className="block group">
      <div
        ref={cardRef}
        className="relative w-[28rem] h-[15rem] transition-transform duration-100 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(var(--tw-rotate-x, 0deg)) rotateY(var(--tw-rotate-y, 0deg))`,
        }}
      >
        <div className="absolute inset-0 z-10 flex flex-col justify-between bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
          {/* Title & Status */}
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {title}
            </h2>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(
                isClosed
              )}`}
            >
              {getStatusIcon(isClosed)}
              {isClosed ? "Closed" : "Active"}
            </div>
          </div>

          {/* Court Name */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
            <BsCalendar3Week className="w-5 h-5 text-gray-600" />
            <div className="min-w-0">
              <p className="text-sm text-gray-600">Court</p>
              <p className="text-gray-900 font-semibold truncate">
                {courtName || "Court Not Specified"}
              </p>
            </div>
          </div>

          {/* Created At */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
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
        </div>

        {/* Glow Hover Overlay */}
        <div className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  );
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
