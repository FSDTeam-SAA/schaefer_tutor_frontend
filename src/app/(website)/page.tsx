"use client";
import Navbar from "@/components/local/navbar";
import { useState } from "react";
import Hero from "./_components/hero";
import Subjects from "./_components/subjects";
import WhySchafer from "./_components/why-schafer";

const NachhilfeLandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Mathematik");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section + About Us Combined */}
      <Hero />

      {/* Features */}
      <WhySchafer />

      {/* Subjects */}
      <Subjects />

      {/* Pricing */}
      <div className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-left text-gray-900 mb-12">
            Unsere Preise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Einzelstunden
                </h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  30€{" "}
                  <span className="text-lg text-gray-600 font-normal">
                    / Stunde
                  </span>
                </div>
                <p className="text-gray-600 mb-6">
                  Flexibel und unverbindlich, ideal für gelegentliche
                  Unterstützung.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Flexibel buchbar
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Individuelle Terminwahl
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ohne Vertragsbindung
                  </li>
                </ul>
                <a
                  href="#contact-form"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium text-center block"
                >
                  Jetzt buchen
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue-600">
              <div className="bg-blue-600 py-2">
                <p className="text-white text-center font-medium">Empfohlen</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Monatliches Paket
                </h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  25€{" "}
                  <span className="text-lg text-gray-600 font-normal">
                    / Stunde
                  </span>
                </div>
                <p className="text-gray-600 mb-6">
                  Mindestens 4 Stunden pro Monat, jede weitere Stunde ebenfalls
                  25€.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <strong>20% Ersparnis</strong> gegenüber Einzelstunden
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Garantierte regelmäßige Termine
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Kontinuierlicher Lernfortschritt
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Persönlicher Lernplan
                  </li>
                </ul>
                <a
                  href="#contact-form"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium text-center block"
                >
                  Jetzt buchen
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div id="contact-form" className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Fordere jetzt deine kostenlose Probestunde an!
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Vollständiger Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      E-Mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Telefonnummer
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Fach
                    </label>
                    <select
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Mathematik</option>
                      <option>Deutsch</option>
                      <option>Englisch</option>
                      <option>Physik</option>
                      <option>Chemie</option>
                      <option>Biologie</option>
                      <option>Geschichte</option>
                      <option>Wirtschaft</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-medium"
                >
                  Probestunde anfordern
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
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
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-gray-400">
              <li>onlinenachhilfe30@gmail.com</li>
              <li>+491627477536</li>
              <li>Speyerer Straße 51, 68199 Mannheim</li>
            </ul>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Schäfer Tutoring. Alle Rechte
              vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NachhilfeLandingPage;
