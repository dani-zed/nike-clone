import React from "react";

const footerLinks = {
  Products: [
    { name: "Air Force 1", href: "#" },
    { name: "Air Max", href: "#" },
    { name: "Blazer", href: "#" },
    { name: "Jordan", href: "#" },
  ],
  Sports: [
    { name: "Running", href: "#" },
    { name: "Basketball", href: "#" },
    { name: "Soccer", href: "#" },
    { name: "Training", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Store Locator", href: "#" },
  ],
  Support: [
    { name: "Help", href: "#" },
    { name: "Order Status", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Contact Us", href: "#" },
  ],
};

export const Footer = () => (
  <footer className="bg-black text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4">
      {/* Links Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h3 className="font-bold mb-4" aria-label={`${category} Links`}>
              {category}
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={`Navigate to ${link.name}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Footer Bottom Section */}
      <div className="border-t border-gray-800 pt-8 text-sm text-gray-400">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white" aria-label="Terms of Service">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white" aria-label="Privacy Policy">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white" aria-label="Cookie Settings">
              Cookie Settings
            </a>
          </div>
          <p>© 2024 Nike, Inc. All Rights Reserved</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
