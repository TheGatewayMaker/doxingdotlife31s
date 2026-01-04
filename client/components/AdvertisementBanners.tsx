export default function AdvertisementBanners() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-center mx-auto mb-6 sm:mb-8 md:mb-10 animate-slideInUp">
      {/* VShield Banner */}
      <a
        href="https://vshield.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:flex-1 max-w-xs sm:max-w-sm md:max-w-md"
        title="VShield - Click to visit"
      >
        <img
          src="https://i.ibb.co/n8z2fsjN/vshieldadv.gif"
          alt="VShield Advertisement"
          className="w-full h-auto rounded-lg shadow-lg"
          loading="lazy"
          decoding="async"
        />
      </a>

      {/* OverBets Banner */}
      <a
        href="https://overbets.info"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:flex-1 max-w-xs sm:max-w-sm md:max-w-md"
        title="OverBets - Click to visit"
      >
        <img
          src="https://i.ibb.co/DPYLdkrH/overbetsadv.gif"
          alt="OverBets Advertisement"
          className="w-full h-auto rounded-lg shadow-lg"
          loading="lazy"
          decoding="async"
        />
      </a>
    </div>
  );
}
