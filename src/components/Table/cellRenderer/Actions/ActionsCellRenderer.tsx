import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { IconWrapper, Wrapper } from './ActionsCellRenderer.styles'
import { EMPTY_VALUE } from '../../../../common/constants'
import { IconButton } from '../../../base/IconButton/IconButton'
import EditIcon from '../../../../assets/icons/pencil-icon.svg'
import DeleteIcon from '../../../../assets/icons/delete-icon.svg'
import ViewIcon from '../../../../assets/icons/eye-icon.svg'

type ActionsCellRendererProps = {
  id?: string
  noView?: boolean
  handleDelete: (id: string) => void
  handleEdit: (id: string) => void
  handleView?: (id: string) => void
}

const ActionsCellRenderer = ({
  id,
  noView,
  handleEdit,
  handleDelete,
  handleView,
}: ActionsCellRendererProps) => {
  const { t } = useTranslation()
  if (!id) return EMPTY_VALUE

  return (
    <Wrapper>
      {!noView && handleView && (
        <IconWrapper>
          <IconButton
            icon={<ViewIcon />}
            title={t('table>cellRenderer>actions>view')}
            onClick={() => handleView(id)}
          />
        </IconWrapper>
      )}
      <IconWrapper>
        <IconButton
          icon={<EditIcon />}
          title={t('table>cellRenderer>actions>edit')}
          onClick={() => handleEdit(id)}
        />
      </IconWrapper>
      <IconWrapper>
        <IconButton
          icon={<DeleteIcon />}
          title={t('table>cellRenderer>actions>delete')}
          onClick={() => handleDelete(id)}
        />
      </IconWrapper>
    </Wrapper>
  )
}

export default memo(ActionsCellRenderer)
