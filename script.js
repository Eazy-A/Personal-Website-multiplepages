const githubReposContainer = document.getElementById('github-repos');
if (githubReposContainer) {
  const githubUsername = 'Eazy-A';
  fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then(response => response.json())
    .then(repos => {
      githubReposContainer.innerHTML = '';
      repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'repo-card';
        card.innerHTML = `
          <a href="${repo.html_url}" target="_blank" rel="noopener" style="font-weight:bold; color:#4f8cff; text-decoration:none; font-size:1.1rem;">${repo.name}</a>
          <p style="margin:0.5rem 0 0 0; color:#333;">${repo.description ? repo.description : ''}</p>
        `;
        githubReposContainer.appendChild(card);
      });
      if (repos.length === 0) {
        githubReposContainer.innerHTML = '<p>No repositories found.</p>';
      }
    })
    .catch(() => {
      githubReposContainer.innerHTML = '<p>Could not load repositories.</p>';
    });
}

const imageDetailSection = document.getElementById('image-detail');
const detailImg = document.getElementById('detail-img');
const detailDesc = document.getElementById('detail-desc');
const closeDetailBtn = document.getElementById('close-detail');

const imageDescriptions = {
  // biography
  'stipago3.jpg': 'I was born in 2005 in Stip, Macedonia, which is a small city located in the east of the country.',
  // education
  'slavcostojmenski.jpg': 'I finished Slavco Stojmenski high school. In Macedonia this type of high school is called gymnasium',
  'thebestclass.jpg': 'A picture of me and my classmates at the end of year 3',
  'with_classmates.jpg': "With classmates chillin'",
  'finkipic.png': "And recently I've finished my first year of undergraduate studies at Finki",
  // newwork
  'after_doingBussines.jpg': 'After making a huge business deal with partners',
  'bussines_linkup_with_tonevbros.jpg': 'Occasional business linkup with friends',
  'bussines_nbaStar.jpg': 'Business with future promising NBA star',
  'bussines_hari.jpg': 'Networking with a friend who is a drink service specialist',
  'bussines_dinner_with_bros.jpg': 'Late night dinner with potential partners',
  'official_wbro.jpg': 'Entering a huge business gathering',
  // doggo
  'doggo1.jpg': 'Random pic of my dog',
  'doggo2.jpg': 'Random pic of my dog pt2',
};

if (imageDetailSection && detailImg && detailDesc && closeDetailBtn) {
  document.querySelectorAll('.gallery-img-container img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      detailImg.src = img.src;
      detailImg.alt = img.alt;
      const filename = img.src.split('/').pop();
      detailDesc.textContent = imageDescriptions[filename] || img.alt || '';
      imageDetailSection.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  closeDetailBtn.addEventListener('click', () => {
    imageDetailSection.style.display = 'none';
    detailImg.src = '';
    detailDesc.textContent = '';
    document.body.style.overflow = '';
  });

  imageDetailSection.addEventListener('click', (e) => {
    if (e.target === imageDetailSection) {
      imageDetailSection.style.display = 'none';
      detailImg.src = '';
      detailDesc.textContent = '';
      document.body.style.overflow = '';
    }
  });
}
