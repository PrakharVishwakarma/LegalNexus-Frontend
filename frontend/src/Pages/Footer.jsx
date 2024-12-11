// Footer.js
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto flex flex-col items-center sm:flex-row sm:justify-between">
          {/* Logo or Brand Name */}
          <div className="text-lg font-semibold mb-4 sm:mb-0">
            Legal Nexus
          </div>
  
          {/* Navigation Links */}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400">Home</a>
            <a href="#" className="hover:text-gray-400">About</a>
            <a href="#" className="hover:text-gray-400">Services</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </div>
  
          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" aria-label="Facebook" className="hover:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24H12.82v-9.294H9.692V10.82h3.128V8.187c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.311h3.59l-.467 3.887h-3.123V24h6.126c.73 0 1.324-.593 1.324-1.324V1.324C24 .593 23.407 0 22.676 0z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.57 2.163-2.723-.949.562-2.005.973-3.127 1.195-.897-.959-2.178-1.558-3.594-1.558-2.719 0-4.924 2.205-4.924 4.924 0 .386.043.762.127 1.124-4.094-.205-7.725-2.165-10.158-5.144-.424.729-.666 1.577-.666 2.476 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.248-2.228-.617v.062c0 2.388 1.698 4.384 3.95 4.835-.414.111-.849.171-1.296.171-.317 0-.626-.03-.928-.086.627 1.956 2.445 3.379 4.6 3.42-1.68 1.318-3.8 2.105-6.102 2.105-.396 0-.787-.023-1.175-.068 2.179 1.398 4.768 2.212 7.548 2.212 9.051 0 13.998-7.496 13.998-13.986 0-.213-.005-.425-.014-.636.961-.689 1.797-1.56 2.457-2.548l-.047-.02z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path d="M22.23 0H1.77C.792 0 0 .774 0 1.723v20.554C0 23.226.792 24 1.77 24h20.46C23.208 24 24 23.226 24 22.277V1.723C24 .774 23.208 0 22.23 0zM7.119 20.452H3.692V9h3.427v11.452zM5.406 7.633c-1.099 0-1.986-.896-1.986-2.004a1.99 1.99 0 011.986-2.003c1.098 0 1.986.896 1.986 2.003s-.888 2.004-1.986 2.004zM20.452 20.452h-3.426v-5.604c0-1.336-.026-3.056-1.864-3.056-1.865 0-2.151 1.46-2.151 2.963v5.697h-3.426V9h3.291v1.561h.046c.457-.864 1.577-1.777 3.243-1.777 3.47 0 4.11 2.283 4.11 5.252v6.416z" />
              </svg>
            </a>
          </div>
        </div>
  
        {/* Copyright Section */}
        <div className="text-center mt-6 text-sm text-gray-500">
          © 2024 YourBrand. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;