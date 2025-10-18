import { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import Segment from './Segment';

const ALL_OPTIONS = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

function Popup({ isOpen, setIsOpen }) {
  const [segmentName, setSegmentName] = useState('');
  const [mainSelect, setMainSelect] = useState('');
  const [schemas, setSchemas] = useState([]);
  const inputRef = useRef(null);
  const selectedValues = schemas.map(s => s.value);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
    function onKey(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, setIsOpen]);
  function addNewSchema() {
    if (!mainSelect) return;
    if (selectedValues.includes(mainSelect)) {
      setMainSelect('');
      return;
    }
    setSchemas(prev => [...prev, { id: Date.now(), value: mainSelect, label: ALL_OPTIONS.find(o => o.value === mainSelect)?.label }]);
    setMainSelect('');
  }
  function handleSchemaChange(id, newValue) {
    setSchemas(prev => prev.map(s => s.id === id ? { ...s, value: newValue, label: ALL_OPTIONS.find(o => o.value === newValue)?.label } : s));
  }
  function removeSchema(id) {
    setSchemas(prev => prev.filter(s => s.id !== id));
  }
  async function saveSegment() {
    if(segmentName.trim() === '' || schemas.length === 0) {
      alert("Please enter a segment name and add at least one schema.");
      return;
    }else{
      const transformed = schemas.map(item => ({
        [item.value]: item.label
      }));
      console.log(transformed);
      const payload = {
        segment_name: segmentName,
        schema: transformed,
      };
      console.log(payload);
      try {
        const res = await fetch('/api/segments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        alert("Data sent to server successfully!");
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        setIsOpen(false);
        setSegmentName('');
        setSchemas([]);
        setMainSelect('');
        console.log('Segment saved', payload);
      } catch (err) {
        console.error('Failed to save segment', err);
      }
    }
  }
  function optionsFor(currentValue) {
    return ALL_OPTIONS.filter(o => {
      return !selectedValues.includes(o.value) || o.value === currentValue;
    });
  }
  return (
    <>
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}
      <div className={`popup ${isOpen ? 'show' : ''}`} role="dialog" aria-modal="true" aria-label="Save segment dialog">
        <div className="popup-header">
          <button className='popup-back-btn' onClick={() => setIsOpen(false)} aria-label="Close">
            <IoIosArrowBack size={24} color='white'/>
          </button>
          <h2 style={{ margin: "0px" }}>Saving Segment</h2>
        </div>
        <div className="popup-content">
          <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6, color: '#000' }}>Enter the Name of the Segment</label>
            <input
              ref={inputRef}
              type="text"
              value={segmentName}
              onChange={() => setSegmentName(inputRef.current.value)}
              placeholder="Name of the segment"
              className='segment-inp'
            />          
            </div>
          <label style={{ display: 'block', marginTop: 6, color: '#000' }}>To save your segment, you need to add the schemas to build the query</label>
          <div className="schema-box">
            {schemas.length === 0 && <p style={{ color: 'white', margin: 0 }}>No schemas added yet.</p>}
            {schemas.map(s => (
              <Segment key={s.id} s={s} optionsFor={optionsFor} handleSchemaChange={handleSchemaChange} removeSchema={removeSchema} />
            ))}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              {schemas.length != ALL_OPTIONS.length ? 
              <select id='segment-sel-main' value={mainSelect} onChange={e => setMainSelect(e.target.value)} className='segment-dropdown'>
                <option value="">Add schema to segment</option>
                  {ALL_OPTIONS.filter(o => !selectedValues.includes(o.value)).map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
              </select> : 
              <p style={{color: "black"}}>All schemas added</p>}
            </div>
            <button type="button" onClick={addNewSchema} className='add-schema-btn'>+Add new schema</button>
          </div>
        </div>
        <div style={{ padding: '20px', display: 'flex', gap: 8, marginTop: 16, position: 'fixed', bottom: '0px', background: '#f6f6f6', width: '90%' }}>
            <button type="button" onClick={saveSegment} className='save-segment-btn'>Save the segment</button>
            <button type="button" onClick={() => setIsOpen(false)} className='cancel-segment-btn'>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default Popup