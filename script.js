
const məhsullar = [
    { ad: 'Tədris 1', kateqoriya: 'Təlim', mövzu: 'Praktiki Əmək Hüququ', qiymət: 185, tarix: '1 ay' },
    { ad: 'Tədris 2', kateqoriya: 'Dərəcələndirmə kursu', mövzu: 'Cinayət və Cinayət Prosessual Hüquq', qiymət: 225, tarix: '2 ay' },
    { ad: 'Tədris 3', kateqoriya: 'Proqram', mövzu: 'Korporativ Hüquq və Peşəkar hüquqi vərdişlər', qiymət: 225, tarix: '2 ay' },
    { ad: 'Tədris 4', kateqoriya: 'Dərəcələndirmə kursu', mövzu: 'Mülki və Mülki Prosessual Hüquq', qiymət: 225, tarix: '2 ay' },
    { ad: 'Tədris 5', kateqoriya: 'Təlim kompleksi', mövzu: 'Sadə Hüquq Kursu', qiymət: 150, tarix: '3 ay' },
    { ad: 'Tədris 6', kateqoriya: 'Təlim kompleksi', mövzu: 'Ümumi Hüquq Kursu', qiymət: 350  , tarix: '3 ay' },
  
];
function parseDate(dateString) {
    const parts = dateString.split(' ');
    const month = parts[1];
    const day = parts[0];
    const year = parts[2];
    return new Date(`${year}-${month}-${day}`);
}

function məhsullarıGöstər(kateqoriyaFiltr, sıralamaSeçimi) {
    const məhsulContainer = document.getElementById('product-container');
    məhsulContainer.innerHTML = '';

    let filtrelenmişMəhsullar = məhsullar;

    if (kateqoriyaFiltr !== 'all') {
        filtrelenmişMəhsullar = məhsullar.filter(məhsul => məhsul.kateqoriya === kateqoriyaFiltr);
    }

    if (sıralamaSeçimi === 'qiymət') {
        filtrelenmişMəhsullar.sort((a, b) => parseFloat(a.qiymət) - parseFloat(b.qiymət));

    } else if (sıralamaSeçimi === 'tarix') {
        filtrelenmişMəhsullar.sort((a, b) => parseDate(a.tarix) - parseDate(b.tarix));
    }
    
    
    
    

    filtrelenmişMəhsullar.forEach(məhsul => {
        const məhsulDiv = document.createElement('div');
        məhsulDiv.classList.add('məhsul');
        məhsulDiv.innerHTML = `
            <h3>${məhsul.ad}</h3>
            <p>Kateqoriya: ${məhsul.kateqoriya}</p>
            <p>Mövzu: ${məhsul.mövzu}</p>
            <p>Qiymət: ${məhsul.qiymət} AZN</p>
            <p>Tarix: ${məhsul.tarix}</p>
        `;
        məhsulContainer.appendChild(məhsulDiv);
    });
}


function mövzularıGöstər() {
    const mövzularDiv = document.getElementById('topics');
    mövzularDiv.innerHTML = '';

    const mövzular = [...new Set(məhsullar.map(məhsul => məhsul.mövzu))];

    mövzular.forEach(mövzu => {
        const mövzuDiv = document.createElement('div');
        mövzuDiv.classList.add('mövzu');
        mövzuDiv.textContent = mövzu;
        mövzularDiv.appendChild(mövzuDiv);
    });
}

document.getElementById('category').addEventListener('change', function () {
    const kateqoriyaFiltr = this.value;
    const sıralamaSeçimi = document.getElementById('sort').value;
    məhsullarıGöstər(kateqoriyaFiltr, sıralamaSeçimi);
});

document.getElementById('sort').addEventListener('change', function () {
    const kateqoriyaFiltr = document.getElementById('category').value;
    const sıralamaSeçimi = this.value;
    məhsullarıGöstər(kateqoriyaFiltr, sıralamaSeçimi);
});
məhsullarıGöstər('all', 'qiymət');
mövzularıGöstər();
