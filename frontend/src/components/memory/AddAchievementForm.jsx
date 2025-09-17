import { useState } from "react"
import EnhancedInput from "../ui/EnhancedInput.jsx"
import EnhancedTextarea from "../ui/EnhancedTextarea.jsx"
import Button from "../ui/Button.jsx"

function AddAchievementForm({ onAdd }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    setLoading(true)
    try {
      await onAdd({
        title: title.trim(),
        description: description.trim(),
        category: category.trim() || "General",
      })

      // Reset form
      setTitle("")
      setDescription("")
      setCategory("")
    } catch (error) {
      console.error("Failed to add achievement:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-achievement-form">
      <h3>Add New Achievement</h3>

      <div className="form-row">
        <EnhancedInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Achievement title"
          className="form-input"
          disabled={loading}
          required
          animatedPlaceholder={true}
        />

        <EnhancedInput
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
          className="form-input"
          disabled={loading}
          animatedPlaceholder={true}
        />
      </div>

      <EnhancedTextarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your achievement..."
        rows={3}
        className="form-textarea"
        disabled={loading}
        required
        animatedPlaceholder={true}
      />

      <div className="button-container-right">
        <Button 
          type="submit" 
          variant="success"
          size="medium"
          disabled={!title.trim() || !description.trim()} 
          loading={loading}
          className="submit-button-enhanced"
        >
          Add Achievement
        </Button>
      </div>
    </form>
  )
}

export default AddAchievementForm
