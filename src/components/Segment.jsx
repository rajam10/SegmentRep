import { MdOutlineRemove } from "react-icons/md";

function Segment({ s, optionsFor, handleSchemaChange, removeSchema }) {
  return (
    <div key={s.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <select id={`segment-sel-${s.id}`} value={s.value} onChange={e => handleSchemaChange(s.id, e.target.value)} className='segment-dropdown'>
            {optionsFor(s.value).map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
        <button type="button" onClick={() => removeSchema(s.id)} style={{ background: '#f2fbf9', border: 'none', color: '#657a93', cursor: 'pointer' }}><MdOutlineRemove color= '#657a93' fontSize='24px'/></button>
    </div>
  )
}

export default Segment