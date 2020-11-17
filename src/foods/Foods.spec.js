import React from 'react'
import context from 'jest-plugin-context'
import { random } from 'lodash'
import { fireEvent, render, wait } from '@testing-library/react'

import { TestApp, t } from '../testUtils'
import * as foodService from './foodService'
import Foods from './Foods'

describe('Foods', () => { 
  let renderedFoods
  let allFoodsSpy

  beforeEach(() => {
    //spy (partial mock) on foodService
    //even though the current getAllFoods is just a function returning static results,
    //this same approach can be used with getAllFoodsActual method, which uses backend through http call
    allFoodsSpy = jest.spyOn(foodService, 'getAllFoods')
  })
  afterEach(() => jest.clearAllMocks())

  it('displays button for showing foods', () => {
    renderedFoods = renderFoods()

    //translation keys are great for matching text content in dom
    //the key is constant as long as the context stays the same
    //but the key value can change --> use the keys to get the values to compare against 
    expect(renderedFoods.getByText(t('foods.button.show'))).not.toBeEmpty()
  })

  describe('showing foods', () => {
    context('with no existing foods', () => {
      beforeEach(async () => {
        const emptyFoods = []

        //stub the return value
        allFoodsSpy.mockReturnValueOnce(emptyFoods)

        //render after isolation-context has been defined
        renderedFoods = renderFoods()

        //especially handy if element contains no text, for example icon button
        const showButton = renderedFoods.getByTestId('show')

        //action on dom
        fireEvent.click(showButton)

        //wait for some reaction for the click action to happen, for example mock/spy called, or some text to appear
        await wait(() => expect(allFoodsSpy).toHaveBeenCalled())
      })

      it('displays no foods guide', () => {
        expect(renderedFoods.getByText(t('foods.noResults'))).not.toBeEmpty()
      })
    })
  
    context('with existing foods', () => {
      let allFoods
      beforeEach(async () => {
        allFoods = [createFood('sörsselssön'), createFood('sauce')]
        //stub the return value
        allFoodsSpy.mockReturnValueOnce(allFoods)

        //render after isolation-context has been defined
        renderedFoods = renderFoods()

        const showButton = renderedFoods.getByTestId('show')

        fireEvent.click(showButton)

        await wait(() => expect(allFoodsSpy).toHaveBeenCalled())
      })

      it('displays table headers', () => {
        expect(renderedFoods.getByText(t('foods.tableHeaders.dessert'))).not.toBeEmpty()
        expect(renderedFoods.getByText(t('foods.tableHeaders.calories'))).not.toBeEmpty()
        expect(renderedFoods.getByText(t('foods.tableHeaders.fat'))).not.toBeEmpty()
        expect(renderedFoods.getByText(t('foods.tableHeaders.carbs'))).not.toBeEmpty()
        expect(renderedFoods.getByText(t('foods.tableHeaders.protein'))).not.toBeEmpty()
      })

      it('displays food names',  () => {
        const foodNames = allFoods.map(f => f.name)
        foodNames.forEach(name => expect(renderedFoods.getByText(name)).not.toBeEmpty())
      })

      it('displays food nutrition information', () => {
        const foodCalories = allFoods.map(f => f.calories)
        const foodFats = allFoods.map(f => f.fat)
        const foodCarbs = allFoods.map(f => f.carbs)
        const foodProteins = allFoods.map(f => f.protein)

        foodCalories.forEach(calories => expect(renderedFoods.getByText(`${calories}`)).not.toBeEmpty())
        foodFats.forEach(fat => expect(renderedFoods.getByText(`${fat}`)).not.toBeEmpty())
        foodCarbs.forEach(carbs => expect(renderedFoods.getByText(`${carbs}`)).not.toBeEmpty())
        foodProteins.forEach(protein => expect(renderedFoods.getByText(`${protein}`)).not.toBeEmpty())
      })
    })
  })

  describe('hiding foods', () => {
    let allFoods
    beforeEach(async () => {
      allFoods = [createFood('minced meat')]
      allFoodsSpy.mockReturnValueOnce(allFoods)

      renderedFoods = renderFoods()

      const showButton = renderedFoods.getByTestId('show')

      fireEvent.click(showButton)

      await wait(() => expect(allFoodsSpy).toHaveBeenCalled())
    })

    context('when clicking hide button', () => {
      beforeEach(async () => {
        const hideButton = renderedFoods.getByTestId('hide')

        fireEvent.click(hideButton)
      })
      it('displays show button', () => {
        expect(renderedFoods.getByTestId('show')).not.toBeEmpty()
      })
      it("doesn't display hide button", () => {
        //use queryBy when you know the element should not be in the dom
        //getBy throws if element is not found
        expect(renderedFoods.queryByTestId('hide')).toBeNull()
      })
      it("doesn't display food table", () => {
        //use queryBy when you know the element should not be in the dom
        //getBy throws if element is not found
        expect(renderedFoods.queryByText(t('foods.tableHeaders.dessert'))).toBeNull()
        expect(renderedFoods.queryByText(t('foods.tableHeaders.calories'))).toBeNull()
        expect(renderedFoods.queryByText(t('foods.tableHeaders.fat'))).toBeNull()
        expect(renderedFoods.queryByText(t('foods.tableHeaders.carbs'))).toBeNull()
        expect(renderedFoods.queryByText(t('foods.tableHeaders.protein'))).toBeNull()
      })
    })
  })

})

const renderFoods = () => render(TestApp(<Foods />))

const createFood = (name) => ({
  name: name,
  //why is random a bad idea?
  calories: random(200, 300),
  fat: random(1, 14),
  carbs: random(31, 150),
  protein: random(15, 30)
})
