const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

type DistanceProps = {
  leg: google.maps.DirectionsLeg;
};

export const Distance = ({ leg }: DistanceProps) => {

  const days = leg.duration && Math.floor(
    (commutesPerYear * leg.duration.value) / secondsPerDay
  );
  const cost: any = leg.distance && Math.floor(
    (leg.distance.value / 1000) * litreCostKM * commutesPerYear
  );

  return (
    <div>
      <p>
        This home is <span className="text-[1.25em] font-bold">{leg.distance && leg.distance.text}</span> away
        from your office. That would take{" "}
        <span className="text-[1.25em] font-bold">{leg.duration && leg.duration.text}</span> each direction.
      </p>

      <p>
        That's <span className="text-[1.25em] font-bold">{days} days</span> in your car each
        year at a cost of{" "}
        <span className="text-[1.25em] font-bold">
          ${new Intl.NumberFormat().format(cost)}
        </span>
        .
      </p>
    </div>
  )
}
