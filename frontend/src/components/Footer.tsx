import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/signup">Sign Up</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="mailto:info@cineniche.com">Email</a>
        <span>Phone: 123-456-7890</span>
        <span>Address: 123 Movie Lane, Filmtown</span>
        <a href="/contact">Contact Us</a>
        <footer className="py-6 px-6 border-t border-zinc-800 text-center text-sm text-gray-400">
          <p>© 2025 CineNiche. All Rights Reserved.</p>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
