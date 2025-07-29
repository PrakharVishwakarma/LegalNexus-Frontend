import { useSetRecoilState } from "recoil";
import { flashMessageState } from '../recoil/atoms/flashMessageAtom';

export const useFlashMessage = () => {
  const setFlash = useSetRecoilState(flashMessageState);

  const showFlash = (type, text) => {
    setFlash({ type, text });

    // Auto-dismiss after 5 seconds
    setTimeout(() => setFlash(null), 5000);
  };

  return { showFlash };
};
