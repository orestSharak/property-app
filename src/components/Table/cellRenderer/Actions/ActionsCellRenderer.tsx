import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Wrapper } from './ActionsCellRenderer.styles'
import { EMPTY_VALUE } from '../../../../common/constants'
import { IconButton } from '../../../base/IconButton/IconButton'
import EditIcon from '../../../../assets/icons/pencil-icon.svg'
import DeleteIcon from '../../../../assets/icons/delete-icon.svg'
import ViewIcon from '../../../../assets/icons/eye-icon.svg'

type ActionsCellRendererProps = {
  id?: string
  noView?: boolean
  handleDelete: () => void
  handleEdit: () => void
}

const ActionsCellRenderer = ({
  id,
  noView,
  handleEdit,
  handleDelete,
}: ActionsCellRendererProps) => {
  const { t } = useTranslation()
  if (!id) return EMPTY_VALUE

  return (
    <Wrapper>
      {!noView && (
        <IconButton
          icon={<ViewIcon />}
          title={t('table>cellRenderer>actions>view')}
          onClick={() => console.log('View', id)}
        />
      )}
      <IconButton
        icon={<EditIcon />}
        title={t('table>cellRenderer>actions>edit')}
        onClick={handleEdit}
      />
      <IconButton
        icon={<DeleteIcon />}
        title={t('table>cellRenderer>actions>delete')}
        onClick={handleDelete}
      />
    </Wrapper>
  )
}

export default memo(ActionsCellRenderer)
