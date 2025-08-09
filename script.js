document.addEventListener('DOMContentLoaded',()=>{
  const foldersEl=document.getElementById('folders');
  const articleEl=document.getElementById('article');
  const titleEl=document.getElementById('title');
  const searchEl=document.getElementById('search');
  const clearEl=document.getElementById('clear');

  function renderFolders(data){
    foldersEl.innerHTML='';
    Object.keys(data).sort().forEach(folder=>{
      if(folder && folder!==''){
        const details=document.createElement('details');
        const summary=document.createElement('summary');
        summary.textContent=folder;
        details.appendChild(summary);
        data[folder].forEach(note=>{
          const a=document.createElement('a');
          a.href='#';
          a.className='note-link';
          a.textContent=note.title;
          a.onclick=()=>{renderNote(note);return false};
          details.appendChild(a);
        });
        foldersEl.appendChild(details);
      } else {
        data[folder].forEach(note=>{
          const a=document.createElement('a');
          a.href='#';
          a.className='note-link';
          a.textContent=note.title;
          a.onclick=()=>{renderNote(note);return false};
          foldersEl.appendChild(a);
        });
      }
    });
  }

  function renderNote(note){
    titleEl.textContent=note.title;
    articleEl.innerHTML=marked.parse(note.content);
    hljs.highlightAll();
  }

  function searchNotes(q){
    const results={};
    Object.keys(NOTES).forEach(folder=>{
      const matched=NOTES[folder].filter(n=>n.title.toLowerCase().includes(q)||n.content.toLowerCase().includes(q));
      if(matched.length>0)results[folder]=matched;
    });
    renderFolders(results);
  }

  searchEl.addEventListener('input',e=>{
    const q=e.target.value.trim().toLowerCase();
    if(q==='') renderFolders(NOTES);
    else searchNotes(q);
  });
  clearEl.onclick=()=>{searchEl.value='';renderFolders(NOTES)};

  renderFolders(NOTES);
});
