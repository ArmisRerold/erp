export default function ButtonDefault({children, onClick}){
  return <>
  <button onClick={onClick} className="w-fit cursor-pointer text-white font-bold bg-slate-700 p-2 rounded-md shadow-2xs shadow-blue-200 hover:bg-white hover:text-slate-700">{children}</button>
  </>
} 