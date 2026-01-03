export default function AnimatedSearchHeading() {
  return (
    <div className="mb-4 sm:mb-4 md:mb-5 lg:mb-6 animate-slideInUp">
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
          font-size: clamp(1.5rem, 4vw, 2.75rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1.35;
          text-align: center;
          margin: 0;
          padding: 0.5rem 1rem;
          background: linear-gradient(
            90deg,
            #0066bb,
            #4a9bff,
            #6bb0ff,
            #b8d4ff,
            #8fa5e8,
            #6bb0ff,
            #4a9bff,
            #0066bb
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientFlow 7s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        @media (max-width: 640px) {
          .search-gradient-heading {
            font-size: 1.5rem;
          }
        }

        @media (min-width: 640px) and (max-width: 768px) {
          .search-gradient-heading {
            font-size: 1.875rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .search-gradient-heading {
            font-size: 2.25rem;
          }
        }

        @media (min-width: 1024px) {
          .search-gradient-heading {
            font-size: 2.75rem;
          }
        }
      `}</style>
    </div>
  );
}
