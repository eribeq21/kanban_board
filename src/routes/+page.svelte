<script>
  import Lane from '$lib/components/lanes/Lane.svelte';
  import CreateIssueDialog from '$lib/components/CreateIssueDialog.svelte';

  let issues = $state([]);  
  let showDialog = $state(false);  

  // Derived filtered issues for each lane
  let doIssues = $derived(issues.filter(issue => issue.status === 'Do'));
  let doingIssues = $derived(issues.filter(issue => issue.status === 'Doing'));
  let doneIssues = $derived(issues.filter(issue => issue.status === 'Done'));
  let archiveIssues = $derived(issues.filter(issue => issue.status === 'Archive'));

  // Callback for adding new issue
  function addIssue(newIssue) {
    issues.push({ ...newIssue, status: 'Do', creationDate: new Date() });  
    showDialog = false;
  }
</script>

<main class="flex flex-col h-screen">
  <header class="p-4 bg-gray-800 text-white">
    <button onclick={() => showDialog = true}>Create Issue</button>
  </header>

  <div class="flex flex-1 overflow-auto">
    <Lane name="Do" color="blue" issues={doIssues} />
    <Lane name="Doing" color="yellow" issues={doingIssues} />
    <Lane name="Done" color="green" issues={doneIssues} />
    <Lane name="Archive" color="gray" issues={archiveIssues} />
  </div>

  {#if showDialog}
    <CreateIssueDialog onCreate={addIssue} onClose={() => showDialog = false} />
  {/if}
</main>

