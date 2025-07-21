export default function PhotoInput() {
  return (
    <div className="field">
      <label className="label">Photo</label>
      <div className="control">
        <div className="file">
          <label className="file-label">
            <input className="file-input" type="file" name="resume" />
            <span className="file-cta">
              <span className="file-label"> Choose a file </span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
