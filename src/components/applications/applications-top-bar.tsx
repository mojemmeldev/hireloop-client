import { BellIcon, LayoutGridIcon, SearchIcon } from "lucide-react";

import { applicationsStyles } from "@/lib/styles/applications";

export function ApplicationsTopBar() {
    return (
        <div className={applicationsStyles.topBar}>
            <label className={applicationsStyles.search}>
                <SearchIcon className={applicationsStyles.searchIcon} aria-hidden="true" />
                <input
                    type="search"
                    placeholder="Search applications..."
                    aria-label="Search applications"
                    className={applicationsStyles.searchInput}
                />
            </label>

            <div className={applicationsStyles.topActions}>
                <button
                    type="button"
                    aria-label="Notifications"
                    className={applicationsStyles.topIconButton}
                >
                    <BellIcon className="size-[18px]" />
                </button>
                <button
                    type="button"
                    aria-label="Apps"
                    className={applicationsStyles.topIconButton}
                >
                    <LayoutGridIcon className="size-[18px]" />
                </button>
                <div className={applicationsStyles.avatar} aria-label="User profile">
                    AM
                </div>
            </div>
        </div>
    );
}
