import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { useFilters } from '../../hooks/useFilters';
import { CENTURIES } from '../../constants/CENTURIES';
import { Sex } from '../../types/Sex';

export const PeopleFilters = () => {
  const { sex, query, centuries, handleSetQuery, getCenturiesParams } =
    useFilters();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': sex === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === Sex.MALE })}
          params={{ sex: Sex.MALE }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === Sex.FEMALE })}
          params={{ sex: Sex.FEMALE }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={event => {
              handleSetQuery(event.target.value);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{
                  centuries: getCenturiesParams(century),
                }}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={cn('button is-link is-outlined is-fullwidth', {
            'is-outlined': sex === null && !centuries.length && query === '',
          })}
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};