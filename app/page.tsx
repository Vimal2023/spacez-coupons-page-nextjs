"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  BadgePercent,
  CheckCircle,
  CircleUserRound,
  Compass,
  Heart,
  Search,
  Copy,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("Coupons");
  const [activeNav, setActiveNav] = useState("Offers");
  const handleAction = (text: string) => {
    setMessage(`${text} copied to clipboard!`);
    setTimeout(() => setMessage(""), 2000);
  };

  const showNavTab = (tab: string) => {
    setActiveNav(tab);
    setMessage(`${tab} No Screen Content`);
    setTimeout(() => setMessage(""), 2000);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll("section")
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(
              entry.target.id as "Coupons" | "Giftcards" | "PaymentOffers"
            );
          }
        });
      },
      {
        root: container,
        threshold: 0.4,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleSignIn = () => {
    setMessage(`Sign in status changed`);
    setTimeout(() => setMessage(""), 2000);
    setSignedIn(!signedIn);
  };
  return (
    <div className="min-h-screen bg-white max-w-sm mx-auto border rounded-lg relative">
      {/* Navbar */}
      <Navbar onClickHandler={showNavTab} />

      {/* Offers */}
      <div className="p-4">
        <h1 className="text-lg font-semibold mb-2 text-[#4B4E4B]">Offers</h1>
        {!signedIn ? (
          <>
            <p className="text-sm text-[#4B4E4B] mb-2">
              Sign in to unlock exclusive additional rewards
            </p>
            <button
              onClick={toggleSignIn}
              className="bg-[#C16B3E] text-white w-full py-2 rounded-md mb-4"
            >
              Sign in
            </button>
          </>
        ) : (
          <p className="text-sm text-[#4B4E4B] mb-4">
            Book directly with us to get exclusive benefits
          </p>
        )}

        {/* Tabs */}
        <div className="flex justify-around text-sm border-b mb-4">
          {["Coupons", "Giftcards", "PaymentOffers"].map((tab) => (
            <a
              key={tab}
              href={`#${tab}`}
              className={`py-2 px-3 font-medium ${
                activeTab === tab
                  ? "text-black border-b-2 border-[#b6602e]"
                  : "text-gray-600 hover:text-black"
              }`}
              onClick={() => {
                // handleAction(`${tab} clicked`);
                setActiveTab(tab);
              }}
            >
              {tab}
            </a>
          ))}
        </div>
        <div
          ref={scrollContainerRef}
          className="h-[60vh] no-scrollbar overflow-auto bg-[#ffffff]"
        >
          {/* Section: Sitewide Coupons */}

          <section id="Coupons">
            <h2 className="font-semibold text-[#4B4E4B] mb-3">
              Sitewide coupons:
            </h2>

            {[
              {
                code: "LONGSTAY",
                price: "₹1,500",
                desc: "15% off when you book for 5 days or more and 20% off when you book for 30 days or more.",
              },
              {
                code: "EARLYBIRD",
                price: "₹1,200",
                desc: "Get 10% off when booking 15 days in advance and 15% off for 30+ days in advance.",
              },
              {
                code: "RUSHDEAL",
                price: "₹8000",
                desc: "Enjoy 10% off when you book last minute stays for 3+ nights.",
              },
            ].map((coupon, i) => (
              <div
                key={i}
                className="flex rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-[#fdf9f7] mb-4"
              >
                <div className="bg-[#b6602e] flex items-center justify-center px-3 py-3 relative">
                  <span className="text-white  font-bold transform -rotate-90 text-2xl whitespace-nowrap">
                    {coupon.price}
                  </span>
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 border-r-2 border-dashed border-white"></div>
                </div>

                <div className="flex-1 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {coupon.code}
                    </h3>
                    <button
                      onClick={() => handleAction(`${coupon.code} `)}
                      className="flex items-center gap-1 text-[#b6602e] text-sm font-medium"
                    >
                      <Copy size={16} />
                      Copy
                    </button>
                  </div>
                  <p className="text-[#7D817D] text-sm mb-3">{coupon.desc}</p>
                  <hr className="border-gray-300 mb-2" />
                  <a className="text-[#7D817D] font-semibold text-sm cursor-pointer hover:underline">
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </section>

          {/* Section: Bonus Gift Cards */}
          <section className="mt-6" id="Giftcards">
            <h2 className="font-semibold text-[#4B4E4B] mb-3">
              Bonus gift cards:
            </h2>
            {!signedIn ? (
              <div className="border rounded-lg shadow-sm bg-[#fdf9f7] p-4 max-w-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#874B2C] font-medium text-sm">
                      Assured vouchers up to
                    </p>
                    <p className="text-[#874B2C] font-extrabold text-2xl flex items-center gap-1">
                      ₹1000 <span className="text-yellow-400 text-lg">✨</span>
                    </p>
                    <p className="text-[#4B4E4B] text-sm">of trending brands</p>
                  </div>
                  <div>
                    <Image
                      src="https://res.cloudinary.com/dosz4fxdk/image/upload/v1762929525/download_1_xukyc6.png"
                      alt="GiftCard"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleAction("Claim Gift Cards")}
                  className="bg-[#b6602e] hover:bg-[#a45324] transition-colors duration-200 text-white w-full py-3 mt-4 rounded-md font-semibold text-lg"
                >
                  Claim gift cards »
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-[#7D7D7D]">Collect multiple of these</h2>
                {[
                  {
                    name: "MYNTRA",
                    value: "₹1500",
                    color: "bg-[#D41C9B]",
                    imgLink:
                      "data:image/jpeg;base64,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",
                    condition: "Get this gift voucher on booking above ₹2000",
                  },
                  {
                    name: "HAMMER",
                    value: "₹1000",
                    color: "bg-black",
                    imgLink:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEUAAAD///9wcHDAwMBbW1teXl7JycnZ2dllZWXU09QuLi6goKCsrKz7+/vr6+t1dXWXl5dKSkoTExPGxsZVVVWysrJHR0cpKSng4OCampqRkZH09PQ1NTWmpqYODg5paWmBgYF8fHwhISE8PDyKiorm5uYbGxu3up3oAAAD00lEQVR4nO3Y2WKiMBiGYYLa2kVxqVqLdnHq3P8lDvkDZAWXtjNz8D5HGkLIxxJCsgwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOB/M8rzYu0WzIs8H0bVnqpqi7BwUVXNi9e4bGT303+f/N2Geq9N+3ejq7js0e+9TeP5hdmMW6XU3i1YVQV3UbWqUD2Ehfe6VK28soEuem7/LqWKd242UjRu/49V4Lbd9BZumm4vDpjdhV1/rApuwlozaT+dUG2connQRwmsBuERlbKXeRTGsOc3Cl9l/KGEE2n9JZ3QrX1MJlS/bI2616OwIHUNEwnjvn1LwnfT+CSdUNnn4yPs4yAsyMow4WE09NnmJOG8Lh7le9lz9xMJp3WU93RC+9hNOhLaQLOwoM84OK2vqTvplHMS6ge+1BVLv7xJqHJn33TC9vFRX0koza26anc4J+FzVTRb634VXrlOKJe3tP+lwE84dS6//l9O/npCbwjeRwmfdA9NzqO3QScaLO2do9uafkYJ3+wzLKcpv/4aluH1OIPu1fHGcYwS1pdZHvuxu0EnvJFnQzX9UcOXKOFOblXpmDlLfsL5cmClEi5qu0JG6kvf+3cqwUu4axIcvUGlSShTBPWYmRN8J0OJn3BtHr7XeqidBwm9V0KcMBTPRr6cUHdSZj1yd7kzMJPQ9P9gRslNIuE8e9CbBmaoHWRBQu+NfzKh/5ycm7CcOiZBwoU98DQ4hXVCibaUfu+zZELzFtns66b8hEP38CcSlpe+KrIzRho9tj6an3KTOdOTOqF5ieuG9KiQTChTBj0FljHJT9hDEm4fKtvyquvXJOx9W+iDNJ8Ppb+tSZg3pzjvStjOGaZNk5eOpUO908el6bRTCbfKeQPpN4G6b7c1CWWIbIKlEw7rhPIYX5PQDGjRB9wZTiWceO3WQ0WtTWi+KMyMMZ2wHtFMw1cllBvotq92hxMJP71IZlBpA7cJzWfgqq2SSGhmeGbX6xLKbOHz7GCtEwn1iTs4W22SzE14sF3pSCh32dY20vNt4b8q7ZxG3jnux+h3JMxV8PkqR4kT6r0++hNmduLuJ4xfegd3kzNrO141nvYnfPZGlqZ3zaqHkzBrD92ZcNZO+fyE0Te++t2RUO70i9cxetdp9MGXfv1H5yLeO1VnzWRHD77+Ok0zkWxvBt1EzzqNvYZv7h1T0XPei+elvWttT4W7KCb0Wlqxs7+jZbl1Eay1FYewyom1Nrt6J2tt4Z7xQiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMC/9gc+NSY2IfPh5QAAAABJRU5ErkJggg==",
                    condition: "Get this gift voucher on booking above ₹1500",
                  },
                ].map((g, i) => (
                  <div
                    key={i}
                    className="flex rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-[#fdf9f7] mb-4"
                  >
                    <div
                      className={`${g.color} flex items-center justify-center px-3 py-4 relative`}
                    >
                      <span className="text-white font-bold transform -rotate-90 text-lg whitespace-nowrap">
                        {g.value}
                      </span>
                      <div className="absolute right-0 top-0 bottom-0 w-1.5 border-r-2 border-dashed border-white"></div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Image
                            src={g.imgLink}
                            alt={g.name}
                            width={40}
                            height={40}
                          />
                          <h3 className="font-bold text-gray-800 text-base">
                            {g.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleAction(`${g.name}`)}
                          className="text-[#b6602e] text-sm font-semibold hover:underline"
                        >
                          Collect
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 mt-5">
                        {g.condition}
                      </p>
                      <hr className="border-gray-300 mb-2" />
                      <a className="text-gray-700 font-semibold text-sm cursor-pointer hover:underline">
                        Read more
                      </a>
                    </div>
                  </div>
                ))}
              </>
            )}
          </section>

          {/* Section: Payment Offers */}
          <section className="mt-6 mb-16 " id="PaymentOffers">
            <h2 className="font-semibold text-[#4B4E4B] mb-3">
              Payment offers:
            </h2>
            {!signedIn ? (
              <div className="border rounded-lg p-5 shadow-sm text-sm bg-[#FDF9F7]">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#4B4E4B]">Save more on your bookings</p>
                    <p className="font-semibold text-[#874B2C] pt-2">
                      <span className="text-2xl">upto 15% Off</span> <br />
                      on select payment methods
                    </p>
                  </div>
                  <Image
                    src="https://res.cloudinary.com/dosz4fxdk/image/upload/v1762919901/spacez_e0dzgk.png"
                    alt="offers"
                    width={70}
                    height={100}
                  />
                </div>
                <button
                  onClick={() => handleAction("Unlock Offers")}
                  className="bg-[#b6602e] text-white w-full py-2 rounded-md mt-3"
                >
                  Unlock offers »
                </button>
              </div>
            ) : (
              <div className="flex rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-[#fdf9f7] max-w-md">
                <div className="bg-[#3168CF] flex items-center justify-center px-3 py-4 relative ">
                  <span className="text-white font-bold transform -rotate-90 text-lg whitespace-nowrap">
                    10% OFF
                  </span>
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 border-r-2 border-dashed border-white"></div>
                </div>
                <div className="flex-1 p-4 gap-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src="data:image/png;base64,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"
                      alt="HDFC BANK"
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-sm object-contain"
                    />
                    <h3 className="font-bold text-gray-800 text-base">
                      HDFC BANK
                    </h3>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-3">
                      Get 10% off on booking above ₹1500
                    </p>
                    <hr className="border-gray-300 mb-2" />
                    <a className="text-gray-700 font-semibold text-sm cursor-pointer hover:underline">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-[#FFFFFF] border-t flex justify-around py-2 text-xs">
        {[
          "Explore",
          "Offers",
          "Bookings",
          "Wishlist",
          signedIn ? "Profile" : "Sign In",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => showNavTab(tab)}
            className="flex flex-col items-center text-gray-600 hover:text-black"
          >
            {tab === "Explore" ? (
              <Search color="#7D817D" />
            ) : tab === "Offers" ? (
              <BadgePercent color="#9a5632" />
            ) : tab === "Bookings" ? (
              <Compass color="#7D817D" />
            ) : tab === "Wishlist" ? (
              <Heart color="#7D817D" />
            ) : (
              <CircleUserRound color="#7D817D" />
            )}
            <span
              className={`mt-1 ${
                tab === "Offers"
                  ? "text-[#9a5632] font-extrabold "
                  : "text-[#7D817D]"
              }`}
            >
              {tab}
            </span>
          </button>
        ))}
      </nav>

      {/* Toast */}
      {message && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#9a5632] text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow">
          <CheckCircle size={18} /> {message}
        </div>
      )}
    </div>
  );
}
