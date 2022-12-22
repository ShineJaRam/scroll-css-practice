import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

interface FadeInComponentProps {
  idx: number;
  children?: ReactNode;
}

export const FadeInComponent: FC<FadeInComponentProps> = ({
  idx,
  children,
}) => {
  const [isActive, setIsActive] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const fadeInCallback: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsActive(true);
      }
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(fadeInCallback, {
      threshold: 0.3,
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [elementRef.current]);

  return (
    <section
      id={`${idx}`}
      ref={elementRef}
      className={`${isActive && 'isActive'}`}
    >
      {children}
    </section>
  );
};
