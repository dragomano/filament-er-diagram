/**
 * Filament ER Diagram – Alpine.js component
 * Loaded asynchronously via FilamentAsset::registerAlpineComponent().
 *
 * Exposes: erDiagram(data, translations) — registered on window by the Filament asset loader.
 */
import { select } from 'd3-selection'
import { zoom, zoomIdentity } from 'd3-zoom'
import { drag } from 'd3-drag'
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force'
import 'd3-transition'

const PALETTE_LIGHT = [
    { fill: '#E6F1FB', header: '#B5D4F4', border: '#185FA5', text: '#0C447C' },
    { fill: '#EEEDFE', header: '#CECBF6', border: '#534AB7', text: '#3C3489' },
    { fill: '#EAF3DE', header: '#C0DD97', border: '#3B6D11', text: '#27500A' },
    { fill: '#E1F5EE', header: '#9FE1CB', border: '#0F6E56', text: '#085041' },
    { fill: '#FAEEDA', header: '#FAC775', border: '#854F0B', text: '#633806' },
    { fill: '#FAECE7', header: '#F5C4B3', border: '#993C1D', text: '#712B13' },
    { fill: '#FBEAF0', header: '#F4C0D1', border: '#993556', text: '#72243E' },
];

const PALETTE_DARK = [
    { fill: '#042C53', header: '#0C447C', border: '#378ADD', text: '#B5D4F4' },
    { fill: '#26215C', header: '#3C3489', border: '#7F77DD', text: '#CECBF6' },
    { fill: '#173404', header: '#27500A', border: '#639922', text: '#C0DD97' },
    { fill: '#04342C', header: '#085041', border: '#1D9E75', text: '#9FE1CB' },
    { fill: '#412402', header: '#633806', border: '#BA7517', text: '#FAC775' },
    { fill: '#4A1B0C', header: '#712B13', border: '#D85A30', text: '#F5C4B3' },
    { fill: '#4B1528', header: '#72243E', border: '#D4537E', text: '#F4C0D1' },
];

const REL_STYLE = {
    hasMany        : { stroke: '#3b82f6', dash: null,  marker: 'url(#m-hasmany)' },
    hasOne         : { stroke: '#22c55e', dash: null,  marker: 'url(#m-hasone)' },
    belongsTo      : { stroke: '#9ca3af', dash: '6,4', marker: 'url(#m-belongsto)' },
    belongsToMany  : { stroke: '#a855f7', dash: null,  marker: 'url(#m-manymany)' },
    hasManyThrough : { stroke: '#3b82f6', dash: '3,3', marker: 'url(#m-hasmany)' },
    morphMany      : { stroke: '#f97316', dash: null,  marker: 'url(#m-hasmany)' },
    morphOne       : { stroke: '#22c55e', dash: null,  marker: 'url(#m-hasone)' },
};

const NODE_W = 172;
const HEADER_H = 32;
const FIELD_H = 22;
const FIELD_PAD = 8;

function nodeHeight(m) {
    return HEADER_H + m.columns.length * FIELD_H + FIELD_PAD;
}

function normalizePayload(payload) {
    const eventPayload = payload?.data?.data?.nodes ? payload.data : payload;
    const data = eventPayload?.data?.nodes ? eventPayload.data : eventPayload;

    return {
        data,
        summary: eventPayload?.summary ?? {
            models: '',
            relationships: '',
            node_relationships: {},
        },
    };
}

function formatMessage(message = '', replacements) {
    return Object.entries(replacements).reduce(
        (text, [key, value]) => text.split(`:${key}`).join(String(value ?? '')),
        message,
    );
}

function columnAriaLabel(column, translations) {
    const flags = [];

    if (column.pk) flags.push(translations.primary_key);
    if (column.fk) flags.push(translations.foreign_key);

    return [
        column.name,
        column.type,
        flags.join(', '),
    ].filter(Boolean).join(', ');
}

function modelNodeAriaLabel(node, summary, translations) {
    const columns = node.columns?.length
        ? node.columns.map(column => columnAriaLabel(column, translations)).join('; ')
        : translations.no_columns;

    return formatMessage(translations.model_node_label, {
        model: node.id,
        table: node.table,
        relationships: summary?.node_relationships?.[node.id] ?? '',
        columns,
    });
}

export default function erDiagram(payload, translations = {}) {
    const initialPayload = normalizePayload(payload);

    return {
        data: initialPayload.data,
        summary: initialPayload.summary,
        statusMsg: translations.highlight_connections_hint ?? '',
        _sim: null,
        _zoom: null,
        _selectedId: null,

        // ── Lifecycle ────────────────────────────────────────────────
        init(svgEl) {
            this._render(svgEl);
        },

        refresh(payload) {
            const nextPayload = normalizePayload(payload);
            const nextData = nextPayload.data;

            if (!nextData?.nodes || !nextData?.edges) return;

            this.data = nextData;
            this.summary = nextPayload.summary;
            this.statusMsg = translations.highlight_connections_hint ?? '';
            this._selectedId = null;
            this._render(this.$refs?.svg);
        },

        _render(svgEl) {
            if (!svgEl) return;

            this._sim?.stop();
            this._sim = null;
            this._zoom = null;

            const isDark = document.documentElement.classList.contains('dark');
            const palette = isDark ? PALETTE_DARK : PALETTE_LIGHT;

            const W = svgEl.clientWidth  || 900;
            const H = svgEl.clientHeight || 600;

            const nodes = this.data.nodes.map((n, i) => ({
                ...n,
                w: NODE_W,
                h: nodeHeight(n),
                color: palette[i % palette.length],
                x: W / 2 + Math.cos((i / this.data.nodes.length) * 2 * Math.PI) * 270,
                y: H / 2 + Math.sin((i / this.data.nodes.length) * 2 * Math.PI) * 200,
            }));

            const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
            const links = this.data.edges
                .filter(e => nodeMap[e.source] && nodeMap[e.target])
                .map(e => ({ ...e, source: nodeMap[e.source], target: nodeMap[e.target] }));

            const root = select(svgEl);
            const g = root.select('#er-g');

            root.interrupt();
            root.attr('aria-busy', 'true');
            g.interrupt().attr('transform', null).selectAll('*').remove();

            // Zoom
            this._zoom = zoom()
                .scaleExtent([0.15, 4])
                .on('zoom', e => g.attr('transform', e.transform));
            root.call(this._zoom);
            root.call(this._zoom.transform, zoomIdentity);

            // Edges
            const edgeSel   = g.append('g').attr('aria-hidden', 'true').selectAll('g').data(links).enter().append('g');
            const edgePaths  = edgeSel.append('path')
                .attr('fill', 'none')
                .attr('stroke-width', 1.5)
                .attr('stroke', d => REL_STYLE[d.type]?.stroke ?? '#9ca3af')
                .attr('stroke-dasharray', d => REL_STYLE[d.type]?.dash ?? null)
                .attr('marker-end', d => REL_STYLE[d.type]?.marker ?? 'url(#m-belongsto)');
            const edgeLabels = edgeSel.append('text')
                .text(d => d.name)
                .attr('font-size', '10')
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'central')
                .attr('fill', isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)');

            // Nodes
            const nodeSel = g.append('g').selectAll('g.er-node').data(nodes).enter()
                .append('g')
                .attr('class', 'er-node')
                .attr('role', 'button')
                .attr('tabindex', 0)
                .attr('aria-pressed', 'false')
                .attr('aria-label', d => modelNodeAriaLabel(d, this.summary, translations))
                .style('cursor', 'pointer')
                .on('click', (_, d) => this._selectNode(d, nodeSel, edgePaths, edgeLabels, links))
                .on('keydown', (e, d) => {
                    if (e.key !== 'Enter' && e.key !== ' ') return;

                    e.preventDefault();
                    this._selectNode(d, nodeSel, edgePaths, edgeLabels, links);
                })
                .on('focus', function () {
                    select(this).select('.er-body').attr('stroke-width', 2.5);
                })
                .on('blur', function () {
                    select(this).select('.er-body').attr('stroke-width', 1);
                })
                .call(drag()
                    .on('start', (e, d) => { if (!e.active) this._sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
                    .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; })
                    .on('end',   (e, d) => { if (!e.active) this._sim.alphaTarget(0); d.fx = null; d.fy = null; })
                );

            // Node body
            nodeSel.append('rect').attr('class', 'er-body')
                .attr('width', d => d.w).attr('height', d => d.h).attr('rx', 8)
                .attr('fill', d => d.color.fill).attr('stroke', d => d.color.border).attr('stroke-width', 1);

            // Header bg
            nodeSel.append('rect').attr('width', d => d.w).attr('height', HEADER_H).attr('rx', 8).attr('fill', d => d.color.header);
            nodeSel.append('rect').attr('y', HEADER_H - 8).attr('width', d => d.w).attr('height', 8).attr('fill', d => d.color.header);

            // Model name
            nodeSel.append('text').text(d => d.id).attr('x', 10).attr('y', HEADER_H / 2)
                .attr('dominant-baseline', 'central').attr('font-size', 13).attr('font-weight', 500)
                .attr('fill', d => d.color.text);

            // Table badge
            nodeSel.append('text').text(d => d.table).attr('x', d => d.w - 8).attr('y', HEADER_H / 2)
                .attr('text-anchor', 'end').attr('dominant-baseline', 'central')
                .attr('font-size', 9).attr('opacity', 0.65).attr('fill', d => d.color.border);

            // Columns
            nodeSel.each(function (d) {
                const el = select(this);

                d.columns.forEach((col, i) => {
                    const y = HEADER_H + i * FIELD_H + FIELD_H / 2 + 4;

                    if (i > 0) el.append('line')
                        .attr('x1', 6).attr('x2', d.w - 6)
                        .attr('y1', HEADER_H + i * FIELD_H + 4).attr('y2', HEADER_H + i * FIELD_H + 4)
                        .attr('stroke', isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)').attr('stroke-width', 0.5);

                    el.append('text').text(col.name).attr('x', 10).attr('y', y)
                        .attr('dominant-baseline', 'central').attr('font-size', 11)
                        .attr('fill', isDark ? 'rgba(255,255,255,0.65)' : 'rgba(20,20,20,0.72)');

                    el.append('text').text(col.type)
                        .attr('x', d.w - (col.pk || col.fk ? 32 : 8)).attr('y', y)
                        .attr('text-anchor', 'end').attr('dominant-baseline', 'central')
                        .attr('font-size', 9).attr('fill', isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)');

                    if (col.pk || col.fk) el.append('text').text(col.pk ? 'PK' : 'FK')
                        .attr('x', d.w - 8).attr('y', y).attr('text-anchor', 'end')
                        .attr('dominant-baseline', 'central').attr('font-size', 9).attr('font-weight', 600)
                        .attr('fill', col.pk ? d.color.border : '#9ca3af');
                });
            });

            nodeSel.selectAll('rect, line, text').attr('aria-hidden', 'true');

            // Force simulation
            this._sim = forceSimulation(nodes)
                .force('link',    forceLink(links).id(d => d.id).distance(310).strength(0.22))
                .force('charge',  forceManyBody().strength(-650))
                .force('center',  forceCenter(W / 2, H / 2))
                .force('collide', forceCollide().radius(d => Math.max(d.w, d.h) * 0.68 + 20))
                .on('tick', () => {
                    nodeSel.attr('transform', d => `translate(${d.x - d.w / 2},${d.y - d.h / 2})`);

                    edgePaths.attr('d', d => {
                        if (d.source === d.target) {
                            const x = d.source.x + d.source.w / 2, y = d.source.y;
                            return `M${x},${y} C${x + 90},${y - 70} ${x + 90},${y + 70} ${x},${y + 24}`;
                        }

                        const dx = d.target.x - d.source.x;
                        const c  = Math.min(Math.abs(dx) * 0.45, 160);

                        return `M${d.source.x},${d.source.y} C${d.source.x + c},${d.source.y} ${d.target.x - c},${d.target.y} ${d.target.x},${d.target.y}`;
                    });

                    edgeLabels.attr('x', d => (d.source.x + d.target.x) / 2)
                            .attr('y', d => (d.source.y + d.target.y) / 2 - 10);
                });

            this._sim.on('end', () => {
                root.attr('aria-busy', 'false');
                this.erZoomReset();
            }).alphaMin(0.05);
        },

        // ── Selection ────────────────────────────────────────────────
        _selectNode(d, nodeSel, edgePaths, edgeLabels, links) {
            this._selectedId = this._selectedId === d.id ? null : d.id;
            nodeSel.attr('aria-pressed', n => this._selectedId === n.id ? 'true' : 'false');

            if (!this._selectedId) {
                nodeSel.style('opacity', 1);
                edgePaths.style('opacity', 0.85);
                edgeLabels.style('opacity', 0.7);

                this.statusMsg = translations.highlight_connections_hint ?? '';

                return;
            }

            const conn = new Set([this._selectedId]);

            links.forEach(l => {
                if (l.source.id === this._selectedId) conn.add(l.target.id);
                if (l.target.id === this._selectedId) conn.add(l.source.id);
            });

            nodeSel.style('opacity', n => conn.has(n.id) ? 1 : 0.12);
            edgePaths.style('opacity', e => (e.source.id === this._selectedId || e.target.id === this._selectedId) ? 1 : 0.04);
            edgeLabels.style('opacity', e => (e.source.id === this._selectedId || e.target.id === this._selectedId) ? 1 : 0.04);

            const relationshipSummary = this.summary.node_relationships?.[d.id] ?? '';

            this.statusMsg = [d.id, d.table, relationshipSummary].filter(Boolean).join(' · ');
        },

        // ── Search ───────────────────────────────────────────────────
        search(q) {
            const svg = document.getElementById('er-g');
            const normalizedQuery = q?.toLowerCase() ?? '';
            let matches = 0;

            select(svg).selectAll('g.er-node').style('opacity', n => {
                if (!normalizedQuery) return 1;

                const isMatch = n.id.toLowerCase().includes(normalizedQuery);

                if (isMatch) matches++;

                return isMatch ? 1 : 0.1;
            });

            this.statusMsg = normalizedQuery
                ? formatMessage(translations.search_status, { count: matches })
                : translations.highlight_connections_hint ?? '';
        },

        // ── Zoom helpers (called from Blade) ─────────────────────────
        erZoom(factor) {
            select(this.$refs?.svg ?? '#er-svg').transition().duration(250).call(this._zoom.scaleBy, factor);
        },

        erZoomReset() {
            const svgEl = this.$refs?.svg;

            if (!svgEl || !this._zoom) return;

            const svg    = select(svgEl);
            const g      = svg.select('#er-g');
            const bounds = g.node()?.getBBox();

            if (!bounds || bounds.width === 0 || bounds.height === 0) {
                svg.transition().duration(350).call(this._zoom.transform, zoomIdentity);
                return;
            }

            const W = svgEl.clientWidth;
            const H = svgEl.clientHeight;

            // Account for the status bar at the bottom (~32px)
            const statusBarH = svgEl.parentElement?.querySelector('.absolute.bottom-0')?.offsetHeight ?? 32;
            const padding = 40;

            const availW = W - padding * 2;
            const availH = H - padding * 2 - statusBarH;

            const scale = Math.min(
                availW / bounds.width,
                availH / bounds.height,
                1,
            );

            // Center within the available area (above the status bar)
            const tx = W / 2 - scale * (bounds.x + bounds.width  / 2);
            const ty = (H - statusBarH) / 2 - scale * (bounds.y + bounds.height / 2);

            svg.transition().duration(350)
                .call(this._zoom.transform, zoomIdentity.translate(tx, ty).scale(scale));
        },

        // ── Export ───────────────────────────────────────────────────
        exportSvg(svgEl) {
            if (!svgEl) return;

            const svgClone = svgEl.cloneNode(true);

            const cleanAttributes = (el) => {
                [...el.attributes].forEach(attr => {
                    if (
                        attr.name.startsWith('wire:') ||
                        attr.name.startsWith('x-')   ||
                        attr.name.startsWith('@')     ||
                        attr.name.startsWith(':')
                    ) {
                        el.removeAttribute(attr.name);
                    }
                });
            };

            cleanAttributes(svgClone);
            svgClone.querySelectorAll('*').forEach(cleanAttributes);

            if (!svgClone.getAttribute('xmlns')) {
                svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            }

            const data = new XMLSerializer().serializeToString(svgClone);
            const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });

            this._triggerDownload(URL.createObjectURL(blob), 'er-diagram.svg');
        },

        exportPng(svgEl) {
            if (!svgEl) return;

            const scale = 3;
            const w = svgEl.clientWidth;
            const h = svgEl.clientHeight;
            const svgClone = svgEl.cloneNode(true);

            svgClone.removeAttribute('wire:ignore');
            svgClone.removeAttribute('x-ref');

            if (!svgClone.getAttribute('viewBox')) {
                svgClone.setAttribute('viewBox', `0 0 ${w} ${h}`);
            }

            svgClone.setAttribute('width',  w * scale);
            svgClone.setAttribute('height', h * scale);

            svgClone.querySelectorAll('*').forEach(el => {
                const computed = window.getComputedStyle(el);
                [
                    'stroke', 'fill', 'stroke-width', 'stroke-dasharray',
                    'font-family', 'font-size', 'font-weight',
                    'opacity', 'visibility', 'display',
                ].forEach(prop => {
                    const value = computed.getPropertyValue(prop);

                    if (value) {
                        el.style[prop.replace(/-./g, x => x[1].toUpperCase())] = value;
                    }
                });

                el.removeAttribute('class');
            });

            const blob = new Blob(
                [new XMLSerializer().serializeToString(svgClone)],
                { type: 'image/svg+xml;charset=utf-8' }
            );

            const url = URL.createObjectURL(blob);

            const canvas = Object.assign(document.createElement('canvas'), {
                width:  w * scale,
                height: h * scale,
            });

            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;

            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
                this._triggerDownload(canvas.toDataURL('image/png', 1.0), 'er-diagram.png');
                URL.revokeObjectURL(url);
            };
            img.onerror = () => {
                console.error('PNG export failed');
                URL.revokeObjectURL(url);
            };
            img.src = url;
        },

        _triggerDownload(href, filename) {
            const a = Object.assign(document.createElement('a'), { href, download: filename });

            a.click();
        },
    };
}
