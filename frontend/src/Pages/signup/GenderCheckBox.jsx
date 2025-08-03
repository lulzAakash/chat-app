const GenderCheckbox = ({onCheckboxChange,selectGender}) => {
	return (
		<div className='flex text-white gap-3'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectGender === "male" ? "selcted" : ""}`}>
					<span className='label-text'>Male</span>
					<input type='checkbox' className='checkbox border-slate-900 mx-2' 
						checked={selectGender === "male"}
						onChange={() => onCheckboxChange("male")}
					/>
				</label>
			</div>
			<div className='form-control'>
			<label className={`label gap-2 cursor-pointer ${selectGender === "female" ? "selcted" : ""}`}>
					<span className='label-text'>Female</span>
					<input type='checkbox' className='checkbox border-slate-900 mx-2'
						checked={selectGender === "female"}
						onChange={() => onCheckboxChange("female")}
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;