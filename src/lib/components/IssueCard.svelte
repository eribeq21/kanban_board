<script>
  let { issue } = $props();  
</script>

<div class="p-4 mb-4 bg-white rounded shadow">
  <h3 class="font-bold">{issue.title}</h3>
  <p>{issue.description}</p>
  <p>Due: {issue.dueDate.toLocaleDateString()}</p>
  <p>Points: {issue.storyPoints}</p>
  <p>Priority: {issue.priority}</p>
</div>