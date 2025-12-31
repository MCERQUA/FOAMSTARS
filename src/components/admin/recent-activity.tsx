import { BsCheckCircle, BsHeart, BsStar, BsJournalCheck } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import { getUserRecentActivities } from '../../lib/neon'
import { useAuth } from '../../contexts/AuthContext'

interface Activity {
  type: string;
  message: string;
  status: string;
  date: string;
  icon: string;
}

export default function RecentActivity() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadActivities();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadActivities = async () => {
    if (!user?.id) return;
    try {
      const data = await getUserRecentActivities(user.id);
      setActivities(data);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (iconType: string) => {
    switch (iconType) {
      case 'booking':
        return <BsJournalCheck />;
      case 'approval':
        return <BsCheckCircle />;
      case 'review':
        return <BsStar />;
      case 'bookmark':
        return <BsHeart />;
      default:
        return <BsCheckCircle />;
    }
  };

  const getActivityStyle = (iconType: string) => {
    switch (iconType) {
      case 'booking':
        return 'bg-light-info text-info';
      case 'approval':
        return 'bg-light-success text-success';
      case 'review':
        return 'bg-light-warning text-warning';
      case 'bookmark':
        return 'bg-light-danger text-danger';
      default:
        return 'bg-light-primary text-primary';
    }
  };

  return (
    <div className="card-body p-0">
      <ul className="dashboardListgroup">
        {loading ? (
          <li>
            <div className="text-center py-4">
              <span className="text-muted">Loading activities...</span>
            </div>
          </li>
        ) : activities.length > 0 ? (
          activities.map((activity, index) => (
            <li key={index}>
              <span className={`icons ${getActivityStyle(activity.icon)}`}>
                {getActivityIcon(activity.icon)}
              </span>
              <div className="listCaps">
                {activity.message}
                <small className="text-muted d-block">
                  {new Date(activity.date).toLocaleDateString()}
                </small>
              </div>
            </li>
          ))
        ) : (
          <li>
            <div className="text-center py-4">
              <span className="text-muted">No recent activities. Create a listing to get started!</span>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}
