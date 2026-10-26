const mermaidBlockSelector = '.custom-md pre[data-language="mermaid"]';
const diagramSelector = ".custom-md .mermaid-diagram";

let renderQueue: Promise<void> = Promise.resolve();
let diagramId = 0;

function showSvg(diagram: HTMLElement, svg: string) {
	diagram.innerHTML = svg;
}

async function renderMermaidBlocks() {
	const blocks = Array.from(document.querySelectorAll<HTMLPreElement>(mermaidBlockSelector));
	const diagrams = Array.from(document.querySelectorAll<HTMLElement>(diagramSelector));
	if (blocks.length === 0 && diagrams.length === 0) return;

	const theme = document.documentElement.classList.contains("dark") ? "dark" : "default";
	const { default: mermaid } = await import("mermaid");
	mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme });

	for (const block of blocks) {
		const source = Array.from(block.querySelectorAll<HTMLElement>(".ec-line > .code"))
			.map((line) => line.textContent ?? "")
			.join("\n");
		const frame = block.closest(".expressive-code");
		if (!source || !frame?.isConnected) continue;

		try {
			const { svg, bindFunctions } = await mermaid.render(`blog-mermaid-${++diagramId}`, source);
			if (!frame.isConnected) continue;
			const diagram = document.createElement("div");
			diagram.className = "mermaid-diagram";
			diagram.dataset.source = source;
			diagram.dataset.theme = theme;
			showSvg(diagram, svg);
			frame.replaceWith(diagram);
			bindFunctions?.(diagram);
		} catch (error) {
			console.error("Unable to render Mermaid diagram:", error);
		}
	}

	for (const diagram of diagrams) {
		if (!diagram.isConnected || diagram.dataset.theme === theme || !diagram.dataset.source) continue;
		try {
			const { svg, bindFunctions } = await mermaid.render(
				`blog-mermaid-${++diagramId}`,
				diagram.dataset.source,
			);
			if (!diagram.isConnected) continue;
			showSvg(diagram, svg);
			diagram.dataset.theme = theme;
			bindFunctions?.(diagram);
		} catch (error) {
			console.error("Unable to update Mermaid diagram theme:", error);
		}
	}
}

function scheduleRender() {
	renderQueue = renderQueue.then(renderMermaidBlocks).catch((error) => {
		console.error("Unable to load Mermaid:", error);
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", scheduleRender, { once: true });
} else {
	scheduleRender();
}

new MutationObserver(scheduleRender).observe(document.documentElement, {
	attributes: true,
	attributeFilter: ["class"],
});

function registerSwup() {
	if (window.swup?.hooks) {
		window.swup.hooks.on("page:view", scheduleRender);
	} else {
		document.addEventListener("swup:enable", registerSwup, { once: true });
	}
}

registerSwup();
