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
        <div className="dashboard--group-container">
            <form className="dashboard--group-form" onSubmit={handleSubmit}>
                <h2>Add a Group</h2>
                <input
                    name="groupName"
                    className="dashboard--group-name"
                    type="text"
                    autoComplete="off"
                    placeholder="group name"
                    value={formData.groupName}
                    onChange={handleChange}
                />
                <input
                    name="groupDescription"
                    className="dashboard--group-description"
                    type="text"
                    autoComplete="off"
                    placeholder="group description"
                    value={formData.groupDescription}
                    onChange={handleChange}
                />
                <input
                    name="groupUsers"
                    className="dashboard--group-users"
                    type="text"
                    autoComplete="off"
                    placeholder="group users (separate each user with a comma)"
                    value={formData.groupUsers}
                    onChange={handleChange}
                />
                <div className="dashboard--group-buttons" >
                    <button type="submit" className="dashboard--group-submit">
                        Submit
                    </button>
                    <button
                        onClick={onCancel}
                        className="dashboard--group-cancel"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddGroupForm;
