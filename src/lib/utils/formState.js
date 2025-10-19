// Create a new issue object from form values
export function createIssue(formData) {
	return {
		id: crypto.randomUUID(),
		title: formData.title,
		description: formData.description,
		dueDate: new Date(formData.dueDate),
		storyPoints: Number(formData.storyPoints),
		priority: formData.priority,
		cardColor: formData.cardColor
	};
}
