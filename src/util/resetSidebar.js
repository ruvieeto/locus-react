const resetSidebar = () => {
	document.body.classList.remove("g-sidenav-hidden");
	document.body.classList.add("g-sidenav-show");
	document.body.classList.add("g-sidenav-pinned");
}

export default resetSidebar;