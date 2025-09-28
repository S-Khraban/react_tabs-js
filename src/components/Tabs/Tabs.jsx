import React from 'react';

/**
 * @param {{
 *   tabs: {id: string, title: string, content: string}[],
 *   activeTabId?: string,
 *   onTabSelected: (id: string) => void
 * }} props
 */
export const Tabs = ({ tabs, activeTabId, onTabSelected }) => {
  if (!Array.isArray(tabs) || tabs.length === 0) {
    return null;
  }

  const fallbackId = tabs[0].id;
  const active = tabs.some(t => t.id === activeTabId)
    ? activeTabId
    : fallbackId;
  const activeTab = tabs.find(t => t.id === active) || tabs[0];

  return (
    <div data-cy="TabsComponent">
      <div className="tabs is-boxed">
        <ul>
          {tabs.map(({ id, title }) => {
            const isActive = id === active;

            return (
              <li
                key={id}
                data-cy="Tab"
                className={isActive ? 'is-active' : undefined}
              >
                <a
                  data-cy="TabLink"
                  href={`#${id}`}
                  onClick={e => {
                    e.preventDefault();
                    if (!isActive) {
                      onTabSelected?.(id);
                    }
                  }}
                >
                  {title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="block" data-cy="TabContent">
        {activeTab.content}
      </div>
    </div>
  );
};
