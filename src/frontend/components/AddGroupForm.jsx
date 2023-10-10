import React, { useState } from "react";

function AddGroupForm({ addGroup, onCancel }) {
    const [formData, setFormData] = useState({
        groupName: "",
        groupDescription: "",
        groupUsers: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addGroup(formData);
    };

    return (
        <div className={"add-group-page"}>
            <h2>Add a Group</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="groupName"
                    type="text"
                    placeholder="group name"
                    value={formData.groupName}
                    onChange={handleChange}
                />
                <input
                    name="groupDescription"
                    type="text"
                    placeholder="group description"
                    value={formData.groupDescription}
                    onChange={handleChange}
                />
                <input
                    name="groupUsers"
                    type="text"
                    placeholder="group users (separate each user with a comma)"
                    value={formData.groupUsers}
                    onChange={handleChange}
                />
                <button onClick={onCancel}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddGroupForm;
