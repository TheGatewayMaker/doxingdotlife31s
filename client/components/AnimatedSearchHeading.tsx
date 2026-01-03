export default function AnimatedSearchHeading() {
  return (
    <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-10 animate-slideInUp">
      <h2 className="search-gradient-heading">
        Who are you looking for?
      </h2>
      <style>{`
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .search-gradient-heading {
          font-size: clamp(1.875rem, 5vw, 3.75rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          text-align: center;
          margin: 0;
          padding: 0 1rem;
          background: linear-gradient(
            90deg,
            #0088cc,
            #ffffff,
            #00d4ff,
            #ffffff,
            #0088cc
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientFlow 6s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        @media (max-width: 640px) {
          .search-gradient-heading {
            font-size: 1.875rem;
          }
        }

        @media (min-width: 640px) and (max-width: 768px) {
          .search-gradient-heading {
            font-size: 2.25rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .search-gradient-heading {
            font-size: 2.75rem;
          }
        }

        @media (min-width: 1024px) {
          .search-gradient-heading {
            font-size: 3.75rem;
          }
        }
      `}</style>
    </div>
  );
}
