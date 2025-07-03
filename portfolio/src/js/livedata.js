export function updateItalianTime() {
  const now = new Date();
  const timeString = new Intl.DateTimeFormat('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Rome',
  }).format(now);
  const [hm, period] = timeString.split(' ');
  const formatted = hm.replace(':', ' ');
  const el = document.querySelector('.time');
  if (el) el.textContent = `${formatted} ${period}`;
}

export function updateAge() {
  const now = new Date();
  const born = new Date(2003, 6, 20);
  let years = now.getFullYear() - born.getFullYear();

  if (
    now.getMonth() < born.getMonth() ||
    (now.getMonth() === born.getMonth() && now.getDate() < born.getDate())
  )
    years--;

  const el = document.querySelector('.name .number');
  if (el) el.textContent = years;
}

export function updateExperience() {
  const now = new Date();
  const start = new Date(2023, 6, 1);
  let years = now.getFullYear() - start.getFullYear();

  if (
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())
  )
    years--;

  const formatted = String(years).padStart(2, '0');
  const el = document.querySelector('.role .number');
  if (el) el.textContent = formatted;
}
