
export default function Footer(){
  return (
    <footer className="mt-20 border-t border-white/10 py-10 text-center text-white/60">
      <div className="container mx-auto px-5">
        <p>© {new Date().getFullYear()} USATether. All rights reserved.</p>
      </div>
    </footer>
  );
}
