export default function Header({titlePage}){
  return (
    <>
      <header className="w-full bg-slate-700 p-2 flex flex-row">
            <h2 className="text-2xl font-black text-white">{titlePage}</h2>
          </header>
    </>
  )
}