import { useEffect, useState } from "react";

const UseReadingProgress = () => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const calculatedCompletion = (currentProgress / scrollHeight) * 100;
        // Ensure completion stays within the range [0, 100]
        const boundedCompletion = Math.max(
          0,
          Math.min(calculatedCompletion, 100)
        );
        setCompletion(boundedCompletion);
      }
    };

    window.addEventListener("scroll", updateScrollCompletion);

    return () => {
      window.removeEventListener("scroll", updateScrollCompletion);
    };
  }, []);

  return completion;
};

export default UseReadingProgress;
