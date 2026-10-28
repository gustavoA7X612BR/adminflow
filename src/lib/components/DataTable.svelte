<script lang="ts">
	let {
		columns,
		rows,
		empty = 'Nenhum resultado encontrado.',
		rowHref
	}: {
		columns: string[];
		rows: (string | number)[][];
		empty?: string;
		rowHref?: (index: number) => string;
	} = $props();
</script>

<div class="table-wrap">
	<table>
		<thead
			><tr
				>{#each columns as column}<th>{column}</th>{/each}</tr
			></thead
		><tbody
			>{#if rows.length}{#each rows as row, index}<tr
						>{#each row as cell}<td
								>{#if rowHref && index === 0}<a href={rowHref(index)}>{cell}</a
									>{:else}{cell}{/if}</td
							>{/each}</tr
					>{/each}{:else}<tr><td class="empty" colspan={columns.length}>{empty}</td></tr
				>{/if}</tbody
		>
	</table>
</div>

<style>
	.table-wrap {
		width: 100%;
		overflow-x: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
		white-space: nowrap;
	}
	th {
		padding: 12px 16px;
		color: #929aaa;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.6px;
		text-transform: uppercase;
	}
	td {
		padding: 14px 16px;
		border-bottom: 1px solid #f0f2f5;
		color: #596477;
		font-size: 14px;
	}
	tbody tr:last-child td {
		border-bottom: 0;
	}
	td:first-child {
		color: #283247;
		font-weight: 600;
	}
	td a {
		color: inherit;
		text-decoration: none;
	}
	td a:hover {
		color: #6b5de3;
	}
	.empty {
		text-align: center;
		padding: 36px;
		color: #929aaa;
		font-weight: 400;
	}
</style>
