import { useEffect, useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { FadeInComponent } from './components/FadeInComponent';

function App() {
  const ref = useRef<HTMLElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);

  const scrollCallback = () => {
    if (ref.current) {
      setScrollRatio(
        1 - ref.current.getBoundingClientRect().y / window.innerHeight
      );
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollCallback);

    return () => {
      window.removeEventListener('scroll', scrollCallback);
    };
  }, []);

  return (
    <StyledApp>
      <section>
        <h1>tailwind css</h1>
      </section>
      <section ref={ref} style={{ opacity: scrollRatio }}>
        <h1>scroll css</h1>
      </section>
      <FadeInComponent idx={0}>
        <div>
          <h1>first contents</h1>
        </div>
      </FadeInComponent>
      <FadeInComponent idx={1}>
        <div>
          <h1>second contents</h1>
        </div>
      </FadeInComponent>
      <FadeInComponent idx={2}>
        <div>
          <h1>third contents</h1>
        </div>
      </FadeInComponent>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  section {
    color: #fff;
    ${tw`flex w-screen h-screen justify-center items-center text-6xl`}

    &:first-child {
      background-color: black;
    }

    &:nth-child(2) {
      background-color: orange;
    }

    &:nth-child(3) {
      background-color: purple;
      opacity: 0;
      &.isActive {
        opacity: 1;
        transition: 0.5s;
      }
    }

    &:nth-child(4) {
      background-color: blue;
      opacity: 0;
      &.isActive {
        opacity: 1;
        transition: 0.5s;
      }
    }

    &:nth-child(5) {
      background-color: green;
      opacity: 0;
      &.isActive {
        opacity: 1;
        transition: 0.5s;
      }
    }
  }
`;
