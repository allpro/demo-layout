import isFunction from 'lodash/isFunction'

import LayoutDemo from '../'


test('LayoutDemo exports correctly', () => {
	expect(isFunction(LayoutDemo)).toBeTruthy()
})
