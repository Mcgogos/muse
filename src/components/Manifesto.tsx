import React from "react";

export default function Manifesto() {
  return (
    <section id="about" className="py-32 px-6 md:px-14 border-t border-white/10 bg-[#060607]">
      <div className="max-w-4xl">
        <p className="font-mono text-xs text-muted tracking-[0.4em] uppercase mb-8">MANIFESTO</p>
        <p className="font-display text-3xl md:text-6xl font-medium tracking-tight leading-tight text-softwhite">
          &quot;Fikirlerin forma, seslerin hikâyeye, teknolojinin sanata dönüştüğü yerdeyiz. MUSE, sınırların başladığı değil; ortadan kalktığı yerdir.&quot;
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 font-mono text-xs text-muted">
          <div>{`//`} DUYUYORUZ</div>
          <div>{`//`} GÖRÜYORUZ</div>
          <div>{`//`} ÜRETİYORUZ</div>
          <div>{`//`} KEŞFEDİYORUZ</div>
        </div>
      </div>
    </section>
  );
}
