const container = document.getElementById('missions-container');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const connStatus = document.getElementById('conn-status');
const liveIndicator = document.getElementById('live-indicator');

function renderEstado(data) {
    if (!data || !data.misiones) return;

    progressText.textContent = `${data.superadas} / ${data.total} Misiones resueltas (${data.porcentaje}%)`;
    progressBar.style.width = `${data.porcentaje}%`;

    container.innerHTML = '';

    data.misiones.forEach((m) => {
        const card = document.createElement('article');
        card.className = `mission-card ${m.exito ? 'success' : 'fail'}`;

        const stateClass = m.exito ? 'state-ok' : 'state-err';
        const stateLabel = m.exito ? 'AUDITADA' : 'FALLO';

        let detailsHtml = '';
        if (m.detalles && m.detalles.length > 0) {
            detailsHtml = `<div class="mission-details">${m.detalles.join('\n')}</div>`;
        }

        card.innerHTML = `
            <div>
                <div class="card-top">
                    <span class="mission-id">MISIÓN ${m.id}</span>
                    <span class="card-state ${stateClass}">${stateLabel}</span>
                </div>
                <h2 class="mission-title">${m.titulo}</h2>
                <p class="mission-msg">${m.mensaje}</p>
                ${detailsHtml}
            </div>
        `;

        container.appendChild(card);
    });
}

function iniciarSSE() {
    const evtSource = new EventSource('/api/stream');

    evtSource.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            renderEstado(data);
            connStatus.textContent = 'Sincronizado';
            liveIndicator.style.backgroundColor = 'var(--color-success)';
        } catch (e) {
            console.error('Error procesando evento SSE:', e);
        }
    };

    evtSource.onerror = () => {
        connStatus.textContent = 'Reconectando...';
        liveIndicator.style.backgroundColor = 'var(--color-error)';
    };
}

// Carga inicial
fetch('/api/estado')
    .then((r) => r.json())
    .then(renderEstado)
    .catch((err) => console.error('Error cargando estado inicial:', err))
    .finally(iniciarSSE);
