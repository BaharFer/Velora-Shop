import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ORDERS = [
  { id: "VE-10234", date: "Jul 12, 2026", status: "Delivered", total: 890 },
  { id: "VE-10198", date: "Jun 28, 2026", status: "Shipped", total: 460 },
  { id: "VE-10142", date: "Jun 3, 2026", status: "Delivered", total: 720 },
];

export default function Profile() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (savedUser) {
    setUser(savedUser);

    const names = savedUser.name.split(" ");

    setFirstName(names[0] || "");
    setLastName(names.slice(1).join(" ") || "");
    setEmail(savedUser.email || "");
  }
}, []);

  return (
    <div className="pt-32 pb-24 px-6 md:px-10 max-w-4xl mx-auto min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-full bg-ink text-white flex items-center justify-center font-display text-2xl">{user?.name?.charAt(0).toUpperCase() || "A"}</div>
        <div>
          <h1 className="font-display text-3xl">{user ? user.name : "Loading..."}</h1>
          <p className="text-sm text-[#8a7f6c]"> {user?.email || "alex@email.com"}</p>
        </div>
      </div>
      <div className="flex gap-8 border-b border-[#e5ddd0] mb-8">
        {["profile", "orders"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`pb-3 text-sm capitalize border-b-2 -mb-px ${tab === t ? "border-champagne text-ink" : "border-transparent text-[#8a7f6c]"}`}>
            {t === "orders" ? "Order History" : "Profile"}
          </button>
        ))}
      </div>
      {tab === "profile" ? (
        <div className="grid md:grid-cols-2 gap-4 max-w-lg">
          <input
 value={firstName}
 onChange={(e) => setFirstName(e.target.value)}
 placeholder="First name"
 className="border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne"
/>
          <input
 value={lastName}
 onChange={(e) => setLastName(e.target.value)}
 placeholder="Last name"
 className="border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne"
/>
         <input
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="Email"
 className="col-span-2 border border-[#e5ddd0] px-4 py-3 text-sm focus:outline-none focus:border-champagne"
/>

<button
type="button"
onClick={() => {
  const updatedUser = {
    ...user,
    name: `${firstName} ${lastName}`,
    email,
  };

  localStorage.setItem("user", JSON.stringify(updatedUser));
  setUser(updatedUser);

  alert("Profile updated!");
}}
className="col-span-2 w-fit bg-ink text-white px-8 py-3 text-xs tracking-[0.15em] uppercase hover:bg-champagne hover:text-ink transition-colors rounded-xl"
>
Save Changes
</button>
        </div>
      ) : (
        <div className="space-y-3">
          {ORDERS.map((o) => (
            <div key={o.id} className="flex items-center justify-between border border-[#e5ddd0] px-5 py-4 text-sm">
              <div>
                <p className="font-medium">{o.id}</p>
                <p className="text-xs text-[#8a7f6c]">{o.date}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 ${o.status === "Delivered" ? "bg-[#F0EAE0] text-[#5c5348]" : "bg-champagne/20 text-[#8a6d1a]"}`}>{o.status}</span>
              <span className="font-medium">${o.total}</span>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate("/")} className="mt-10 text-xs tracking-wide uppercase text-[#8a7f6c] hover:text-ink">
        Sign Out
      </button>
    </div>
  );
}
