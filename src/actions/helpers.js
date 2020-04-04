import { setState } from "statezero";

// Initialize all state paths used by your app as empty.
// These are the states that you can filter using filterState()
// as needed by specific components. All component classes that read
// from these state paths must extend BaseReactComponent class.
//
// - userID state path is used by the root App component
export const setEmptyState = () => {
    setState("userID", null);
    setState("loginForm", { name: "", password: "" });
};
