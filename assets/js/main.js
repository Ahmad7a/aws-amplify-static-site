// Portfolio interactions and contact form handling
(function () {
	// Theme toggle: initialize from localStorage or prefers-color-scheme
	const root = document.documentElement;
	const savedTheme = localStorage.getItem('theme');
	const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
	const initialLight = savedTheme ? savedTheme === 'light' : prefersLight;
	if (initialLight) root.classList.add('theme-light');

	const toggleBtn = document.getElementById('theme-toggle');
	function setTheme(isLight) {
		root.classList.toggle('theme-light', isLight);
		localStorage.setItem('theme', isLight ? 'light' : 'dark');
	}
	if (toggleBtn) {
		toggleBtn.addEventListener('click', () => setTheme(!root.classList.contains('theme-light')));
	}

	// Set current year in footer
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Contact form logic
	const form = document.getElementById('contact-form');
	if (!form) return;

	const statusEl = document.getElementById('form-status');

	function setStatus(msg, type = 'info') {
		if (!statusEl) return;
		statusEl.textContent = msg;
		statusEl.style.color = type === 'error' ? '#ff9a9a' : type === 'success' ? '#7dffb0' : '';
	}

	function toMailto(formData) {
		const to = form.dataset.to || '';
		const subject = encodeURIComponent(formData.get('subject') || 'New message from portfolio');
		const body = encodeURIComponent(
			`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`
		);
		return `mailto:${to}?subject=${subject}&body=${body}`;
	}

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		// Honeypot check
		const hp = form.querySelector('input[name="company"]');
		if (hp && hp.value) {
			setStatus('Thanks!', 'success');
			form.reset();
			return;
		}

		const data = new FormData(form);
		const endpoint = (form.dataset.endpoint || '').trim();
		const to = (form.dataset.to || '').trim();

		// Basic validation
		if (!data.get('name') || !data.get('email') || !data.get('message')) {
			setStatus('Please fill in name, email, and message.', 'error');
			return;
		}

		setStatus('Sending…');
		const submitBtn = form.querySelector('button[type="submit"]');
		submitBtn && (submitBtn.disabled = true);

		try {
			if (endpoint) {
				const res = await fetch(endpoint, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name: data.get('name'),
						email: data.get('email'),
						subject: data.get('subject'),
						message: data.get('message')
					})
				});
				if (!res.ok) throw new Error('Request failed');
				setStatus('Message sent. Thank you!', 'success');
				form.reset();
			} else if (to) {
				// mailto fallback
				window.location.href = toMailto(data);
				setStatus('Opening your email client…', 'success');
			} else {
				setStatus('No endpoint or email configured. Please set data-endpoint or data-to on the form.', 'error');
			}
		} catch (err) {
			console.error(err);
			setStatus('Something went wrong. Please try again later.', 'error');
		} finally {
			submitBtn && (submitBtn.disabled = false);
		}
	});
})();