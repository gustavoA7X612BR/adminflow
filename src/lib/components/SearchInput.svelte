<script lang="ts">
	/** Propriedades aceitas por {@link SearchInput}. */
	interface Props {
		/**
		 * Texto da busca. Esta propriedade aceita binding, permitindo que o
		 * componente pai leia e atualize o valor com `bind:value`.
		 */
		value: string;
		/** Texto de orientação exibido enquanto o campo estiver vazio. */
		placeholder?: string;
		/** Nome acessível aplicado ao campo e ao rótulo visualmente oculto. */
		label?: string;
	}

	let { value = $bindable(), placeholder = 'Buscar...', label = 'Buscar' }: Props = $props();
</script>

<label class="search-input">
	<span class="sr-only">{label}</span>

	<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<circle cx="11" cy="11" r="7" />
		<path d="m16 16 4 4" />
	</svg>

	<input type="search" bind:value {placeholder} aria-label={label} />
</label>

<style>
	.search-input {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		max-width: 420px;
		padding: 11px 14px;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 10px;
		background: var(--surface, #fff);
		color: var(--text-muted, #737b8c);
		transition:
			border-color 150ms ease,
			box-shadow 150ms ease;
	}

	.search-input:focus-within {
		border-color: var(--accent, #5a33a5);
		box-shadow: 0 0 0 3px rgb(90 51 165 / 12%);
	}

	svg {
		flex-shrink: 0;
		width: 18px;
		height: 18px;
	}

	input {
		width: 100%;
		min-width: 0;
		border: 0;
		outline: 0;
		background: transparent;
		color: var(--text-primary, #172033);
		font: inherit;
		font-size: 0.9rem;
	}

	input::placeholder {
		color: var(--text-muted, #737b8c);
	}

	input:focus-visible {
		outline: none;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		clip-path: inset(50%);
	}
</style>
