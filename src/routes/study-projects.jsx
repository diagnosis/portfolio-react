import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/study-projects')({
  component: StudyProjects,
})

function StudyProjects() {
  return(
      <>
        <div className={ 'card-container flex flex-wrap align-middle justify-center'}>
          <div className='card '>
            <div>
              <h1>Study Projects</h1>
            </div>
          </div>
        </div>
      </>
  )
}
