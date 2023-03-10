import { toKoreanTime } from 'components/todo/detail/display-time/utils';

export function commonBeforeEach() {
  cy.request('GET', '/api/seed');

  cy.seedUserLogin();

  cy.visit('/todos/index');

  cy.get('[data-cy="todo"]');
}

export function plusOneMinute(date: Date) {
  return new Date(date.getTime() + 60 * 1000);
}

export function matchElementTextWithDate(date: Date) {
  const ISOString = date.toISOString();
  const plusOneSecondISOString = plusOneMinute(date).toISOString();

  return ($el: JQuery<HTMLElement>) => {
    const text = $el.text();

    expect(text).to.be.oneOf([
      toKoreanTime(ISOString),
      toKoreanTime(plusOneSecondISOString),
    ]);
  };
}
