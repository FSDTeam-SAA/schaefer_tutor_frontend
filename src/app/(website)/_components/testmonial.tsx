import ReviewCard from "./reviewCard";

const Testmonial = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-left text-gray-900 mb-12">
          Was unsere Schüler sagen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Lisa M.",
              text: "Dank der Nachhilfe habe ich meine Mathenote von 4 auf 2 verbessert! Mein Tutor erklärt alles sehr geduldig und verständlich.",
            },
            {
              name: "Max K.",
              text: "Die flexible Terminplanung passt perfekt zu meinem vollen Stundenplan. Die Nachhilfe in Englisch hat mir sehr geholfen!",
            },
            {
              name: "Sarah L.",
              text: "Ich war sehr nervös vor meinem Physik-Abitur, aber mit der Hilfe meines Tutors habe ich mich gut vorbereitet gefühlt und eine 1,7 erreicht!",
            },
          ].map((_, index) => (
            <ReviewCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testmonial;
