import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -29.7202683,
      longitude: -53.7868445,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -29.7307495,
      longitude: -52.4737142,
    })

    const { gyms } = await sut.execute({
      userLatitude: -29.7132563,
      userLongitude: -53.7331003,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })

  // it.skip('should be able to fetch paginated gym search', async () => {
  //   for (let i = 1; i <= 22; i++) {
  //     await gymsRepository.create({
  //       title: `JavaScript Gym ${i}`,
  //       description: null,
  //       phone: null,
  //       latitude: -29.7202683,
  //       longitude: -53.7868445,
  //     })
  //   }
  //   const { gyms } = await sut.execute({
  //     query: 'JavaScript',
  //     page: 2,
  //   })

  //   expect(gyms).toHaveLength(2)
  //   expect(gyms).toEqual([
  //     expect.objectContaining({ title: 'JavaScript Gym 21' }),
  //     expect.objectContaining({ title: 'JavaScript Gym 22' }),
  //   ])
  // })
})
